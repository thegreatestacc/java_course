package org.sovliv.backend.service;

import org.sovliv.backend.dto.CompileResponse;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.concurrent.*;

/**
 * @author Vladimir Solovyov
 * @project java-course-site
 * @date on 25/12/2025
 */
@Service
public class JavaExecutionService {

    private static final long TIMEOUT_SECONDS = 10;
    private static final String TEMP_DIR = System.getProperty("java.io.tmpdir");
    private static final int MAX_CODE_LENGTH = 10000;

    public CompileResponse executeCode(String code) {
        CompileResponse response = new CompileResponse();

        // Валидация
        if (code == null || code.trim().isEmpty()) {
            response.setError("Код не может быть пустым");
            return response;
        }

        if (code.length() > MAX_CODE_LENGTH) {
            response.setError("Код слишком длинный (максимум " + MAX_CODE_LENGTH + " символов)");
            return response;
        }

        // Проверка на наличие класса Main
        if (!code.contains("class") || !code.contains("main")) {
            response.setError("Код должен содержать класс с методом main");
            return response;
        }

        Path tempDir = null;
        try {
            // Создаем временную директорию
            tempDir = Files.createTempDirectory(Paths.get(TEMP_DIR), "java_exec_");

            // Извлекаем имя класса из кода
            String className = extractClassName(code);
            if (className == null) {
                className = "Main";
            }

            // Создаем файл с правильным именем класса
            Path actualJavaFile = tempDir.resolve(className + ".java");
            // Записываем с явной кодировкой UTF-8
            try (java.io.PrintWriter writer = new java.io.PrintWriter(
                    new java.io.OutputStreamWriter(
                            Files.newOutputStream(actualJavaFile),
                            java.nio.charset.StandardCharsets.UTF_8))) {
                writer.print(code);
            }

            // Компиляция
            ProcessBuilder compileBuilder = new ProcessBuilder("javac", "-encoding", "UTF-8", actualJavaFile.toString());
            compileBuilder.directory(tempDir.toFile());
            compileBuilder.redirectErrorStream(true);
            // Убираем JAVA_TOOL_OPTIONS, чтобы избежать сообщения "Picked up JAVA_TOOL_OPTIONS"
            compileBuilder.environment().remove("JAVA_TOOL_OPTIONS");
            if (!System.getProperty("os.name").toLowerCase().contains("windows")) {
                compileBuilder.environment().put("LANG", "ru_RU.UTF-8");
                compileBuilder.environment().put("LC_ALL", "ru_RU.UTF-8");
            }
            Process compileProcess = compileBuilder.start();

            String compileOutput = readProcessOutput(compileProcess);
            int compileExitCode = compileProcess.waitFor();

            if (compileExitCode != 0) {
                response.setError("Ошибка компиляции:\n" + compileOutput);
                return response;
            }

            // Выполнение - создаем wrapper класс для правильной работы с UTF-8
            // Создаем wrapper класс, который переопределяет System.out
            String wrapperCode = "import java.io.*;\n" +
                    "public class OutputWrapper {\n" +
                    "    public static void main(String[] args) throws Exception {\n" +
                    "        // Переопределяем System.out с UTF-8\n" +
                    "        System.setOut(new PrintStream(System.out, true, \"UTF-8\"));\n" +
                    "        System.setErr(new PrintStream(System.err, true, \"UTF-8\"));\n" +
                    "        // Загружаем и запускаем основной класс\n" +
                    "        Class<?> mainClass = Class.forName(\"" + className + "\");\n" +
                    "        java.lang.reflect.Method mainMethod = mainClass.getMethod(\"main\", String[].class);\n" +
                    "        mainMethod.invoke(null, (Object) new String[0]);\n" +
                    "    }\n" +
                    "}";
            
            Path wrapperFile = tempDir.resolve("OutputWrapper.java");
            try (java.io.PrintWriter writer = new java.io.PrintWriter(
                    new java.io.OutputStreamWriter(
                            Files.newOutputStream(wrapperFile),
                            java.nio.charset.StandardCharsets.UTF_8))) {
                writer.print(wrapperCode);
            }
            
            // Компилируем wrapper
            ProcessBuilder wrapperCompileBuilder = new ProcessBuilder("javac", "-encoding", "UTF-8", 
                    wrapperFile.toString(), actualJavaFile.toString());
            wrapperCompileBuilder.directory(tempDir.toFile());
            wrapperCompileBuilder.redirectErrorStream(true);
            // Убираем JAVA_TOOL_OPTIONS, чтобы избежать сообщения "Picked up JAVA_TOOL_OPTIONS"
            wrapperCompileBuilder.environment().remove("JAVA_TOOL_OPTIONS");
            Process wrapperCompileProcess = wrapperCompileBuilder.start();
            readProcessOutput(wrapperCompileProcess); // Читаем вывод, чтобы процесс не завис
            int wrapperCompileExitCode = wrapperCompileProcess.waitFor();
            
            if (wrapperCompileExitCode != 0) {
                // Если wrapper не скомпилировался, используем обычный способ
                ProcessBuilder runBuilder = new ProcessBuilder("java", 
                        "-Dfile.encoding=UTF-8", 
                        "-Dconsole.encoding=UTF-8",
                        "-Dstdout.encoding=UTF-8",
                        "-cp", tempDir.toString(), className);
                runBuilder.directory(tempDir.toFile());
                runBuilder.redirectErrorStream(true);
                // Убираем JAVA_TOOL_OPTIONS, чтобы избежать сообщения "Picked up JAVA_TOOL_OPTIONS"
                runBuilder.environment().remove("JAVA_TOOL_OPTIONS");
                if (!System.getProperty("os.name").toLowerCase().contains("windows")) {
                    runBuilder.environment().put("LANG", "ru_RU.UTF-8");
                    runBuilder.environment().put("LC_ALL", "ru_RU.UTF-8");
                }
                Process runProcess = runBuilder.start();
                
                ExecutorService executor = Executors.newSingleThreadExecutor();
                Future<String> future = executor.submit(() -> readProcessOutput(runProcess));
                
                try {
                    String runOutput = future.get(TIMEOUT_SECONDS, TimeUnit.SECONDS);
                    int runExitCode = runProcess.waitFor();
                    
                    if (runExitCode == 0) {
                        response.setOutput(runOutput);
                    } else {
                        response.setError("Ошибка выполнения:\n" + runOutput);
                    }
                } catch (TimeoutException e) {
                    runProcess.destroyForcibly();
                    response.setError("Превышено время выполнения (максимум " + TIMEOUT_SECONDS + " секунд)");
                } finally {
                    executor.shutdown();
                }
            } else {
                // Используем wrapper для выполнения
                ProcessBuilder runBuilder = new ProcessBuilder("java", 
                        "-Dfile.encoding=UTF-8", 
                        "-Dconsole.encoding=UTF-8",
                        "-Dstdout.encoding=UTF-8",
                        "-cp", tempDir.toString(), "OutputWrapper");
                runBuilder.directory(tempDir.toFile());
                runBuilder.redirectErrorStream(true);
                // Убираем JAVA_TOOL_OPTIONS, чтобы избежать сообщения "Picked up JAVA_TOOL_OPTIONS"
                runBuilder.environment().remove("JAVA_TOOL_OPTIONS");
                if (!System.getProperty("os.name").toLowerCase().contains("windows")) {
                    runBuilder.environment().put("LANG", "ru_RU.UTF-8");
                    runBuilder.environment().put("LC_ALL", "ru_RU.UTF-8");
                }
                Process runProcess = runBuilder.start();
                
                ExecutorService executor = Executors.newSingleThreadExecutor();
                Future<String> future = executor.submit(() -> readProcessOutput(runProcess));
                
                try {
                    String runOutput = future.get(TIMEOUT_SECONDS, TimeUnit.SECONDS);
                    int runExitCode = runProcess.waitFor();
                    
                    if (runExitCode == 0) {
                        response.setOutput(runOutput);
                    } else {
                        response.setError("Ошибка выполнения:\n" + runOutput);
                    }
                } catch (TimeoutException e) {
                    runProcess.destroyForcibly();
                    response.setError("Превышено время выполнения (максимум " + TIMEOUT_SECONDS + " секунд)");
                } finally {
                    executor.shutdown();
                }
            }

        } catch (Exception e) {
            response.setError("Ошибка: " + e.getMessage());
        } finally {
            // Очистка временных файлов
            if (tempDir != null) {
                deleteDirectory(tempDir.toFile());
            }
        }

        return response;
    }

    private String extractClassName(String code) {
        // Улучшенное извлечение имени класса
        // Ищем "class" как отдельное слово
        String pattern = "\\bclass\\s+([A-Za-z_][A-Za-z0-9_]*)";
        java.util.regex.Pattern p = java.util.regex.Pattern.compile(pattern);
        java.util.regex.Matcher m = p.matcher(code);
        
        if (m.find()) {
            return m.group(1);
        }
        
        // Fallback: простое извлечение
        int classIndex = code.indexOf("class");
        if (classIndex == -1) {
            return null;
        }

        int start = classIndex + 5; // после "class"
        while (start < code.length() && Character.isWhitespace(code.charAt(start))) {
            start++;
        }

        int end = start;
        while (end < code.length() && (Character.isLetterOrDigit(code.charAt(end)) || code.charAt(end) == '_')) {
            end++;
        }

        if (end > start) {
            return code.substring(start, end);
        }

        return null;
    }

    private String readProcessOutput(Process process) throws IOException {
        StringBuilder output = new StringBuilder();
        // Читаем байты напрямую
        try (java.io.InputStream inputStream = process.getInputStream();
             java.io.ByteArrayOutputStream byteArrayOutputStream = new java.io.ByteArrayOutputStream()) {
            
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                byteArrayOutputStream.write(buffer, 0, bytesRead);
            }
            
            byte[] bytes = byteArrayOutputStream.toByteArray();
            
            // Пробуем разные кодировки для Windows
            String result = null;
            if (System.getProperty("os.name").toLowerCase().contains("windows")) {
                // Сначала пробуем UTF-8
                result = new String(bytes, java.nio.charset.StandardCharsets.UTF_8);
                // Проверяем, что результат корректный (нет заменяющих символов)
                if (result.contains("\uFFFD")) {
                    // Если есть заменяющие символы, значит это не UTF-8
                    // Пробуем Windows-1251 (обычная кодировка для русских символов в Windows)
                    try {
                        java.nio.charset.Charset windowsCharset = java.nio.charset.Charset.forName("windows-1251");
                        result = new String(bytes, windowsCharset);
                    } catch (Exception e) {
                        // Если не получилось, используем системную кодировку
                        result = new String(bytes, java.nio.charset.Charset.defaultCharset());
                    }
                }
            } else {
                // Для не-Windows систем используем UTF-8
                result = new String(bytes, java.nio.charset.StandardCharsets.UTF_8);
            }
            
            output.append(result);
        }
        
        // Фильтруем сообщение "Picked up JAVA_TOOL_OPTIONS" из вывода
        String filteredOutput = output.toString();
        filteredOutput = filteredOutput.replaceAll("Picked up JAVA_TOOL_OPTIONS:.*?\\r?\\n", "");
        filteredOutput = filteredOutput.replaceAll("Picked up JAVA_TOOL_OPTIONS:.*", "");
        
        return filteredOutput;
    }

    private void deleteDirectory(File directory) {
        if (directory.exists()) {
            File[] files = directory.listFiles();
            if (files != null) {
                for (File file : files) {
                    if (file.isDirectory()) {
                        deleteDirectory(file);
                    } else {
                        file.delete();
                    }
                }
            }
            directory.delete();
        }
    }
}

