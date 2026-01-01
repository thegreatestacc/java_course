package org.sovliv.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@ConditionalOnBean(JavaMailSender.class)
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.base-url:http://localhost:3000}")
    private String baseUrl;

    @Value("${spring.mail.username:}")
    private String mailUsername;

    @Autowired
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    private boolean isEmailConfigured() {
        return mailSender != null && mailUsername != null && !mailUsername.trim().isEmpty();
    }

    public void sendVerificationEmail(String to, String name, String token) throws Exception {
        if (!isEmailConfigured()) {
            throw new IllegalStateException("Email сервис не настроен. Проверьте конфигурацию MAIL_USERNAME и MAIL_PASSWORD.");
        }
        
        String verificationUrl = baseUrl + "/verify-email?token=" + token;
        
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Подтверждение регистрации - Java с нуля до Middle");
        message.setText(
            "Здравствуйте, " + name + "!\n\n" +
            "Спасибо за регистрацию на платформе Java с нуля до Middle.\n\n" +
            "Для завершения регистрации и активации вашего аккаунта, пожалуйста, перейдите по ссылке:\n" +
            verificationUrl + "\n\n" +
            "Если вы не регистрировались на нашем сайте, просто проигнорируйте это письмо.\n\n" +
            "С уважением,\n" +
            "Команда Java с нуля до Middle"
        );
        
        try {
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Ошибка отправки email подтверждения: " + e.getClass().getSimpleName() + " - " + e.getMessage());
            if (e.getCause() != null) {
                System.err.println("Причина: " + e.getCause().getMessage());
            }
            throw new Exception("Не удалось отправить email: " + e.getMessage(), e);
        }
    }

    public void sendPasswordResetEmail(String to, String name, String token) throws Exception {
        if (!isEmailConfigured()) {
            throw new IllegalStateException("Email сервис не настроен. Проверьте конфигурацию MAIL_USERNAME и MAIL_PASSWORD.");
        }
        
        String resetUrl = baseUrl + "/reset-password?token=" + token;
        
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Восстановление пароля - Java с нуля до Middle");
        message.setText(
            "Здравствуйте, " + name + "!\n\n" +
            "Вы запросили восстановление пароля для вашего аккаунта.\n\n" +
            "Для установки нового пароля перейдите по ссылке:\n" +
            resetUrl + "\n\n" +
            "Эта ссылка действительна в течение 24 часов.\n\n" +
            "Если вы не запрашивали восстановление пароля, просто проигнорируйте это письмо.\n\n" +
            "С уважением,\n" +
            "Команда Java с нуля до Middle"
        );
        
        try {
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Ошибка отправки email восстановления пароля: " + e.getClass().getSimpleName() + " - " + e.getMessage());
            if (e.getCause() != null) {
                System.err.println("Причина: " + e.getCause().getMessage());
            }
            throw new Exception("Не удалось отправить email: " + e.getMessage(), e);
        }
    }
}

