package org.sovliv.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Vladimir Solovyov
 * @project java-course-site
 * @date on 25/12/2025
 */

@RestController
public class HealthController {

    @GetMapping("/api/health")
    public String health() {
        return "ok";
    }
}