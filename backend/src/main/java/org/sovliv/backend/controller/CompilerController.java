package org.sovliv.backend.controller;

import org.sovliv.backend.dto.CompileRequest;
import org.sovliv.backend.dto.CompileResponse;
import org.sovliv.backend.service.JavaExecutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * @author Vladimir Solovyov
 * @project java-educational-material-site
 * @date on 25/12/2025
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(originPatterns = "*")
public class CompilerController {

    private final JavaExecutionService javaExecutionService;

    @Autowired
    public CompilerController(JavaExecutionService javaExecutionService) {
        this.javaExecutionService = javaExecutionService;
    }

    @PostMapping("/compile")
    public ResponseEntity<CompileResponse> compileAndRun(@RequestBody CompileRequest request) {
        try {
            CompileResponse response = javaExecutionService.executeCode(request.getCode());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            CompileResponse errorResponse = new CompileResponse();
            errorResponse.setError("Ошибка сервера: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}


