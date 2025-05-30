package com.example.demo.Controller;

import com.example.demo.Services.AuthService;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
    logger.info("Login request recebido para email: {}", request.getEmail());
    
    LoginResponse response = authService.authenticate(request);
    
    logger.info("Login realizado com sucesso para email: {}", request.getEmail());
    
    return ResponseEntity.ok(response);
    }


}
