package com.example.demo.Services;

import com.example.demo.Security.JwtTokenProvider;
import com.example.demo.Security.UserPrincipal;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public LoginResponse authenticate(LoginRequest request) {
        logger.info("Tentando autenticar usuário: {}", request.getEmail());

        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            logger.info("Usuário autenticado: {}", authentication.isAuthenticated());

            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            String token = jwtTokenProvider.generateToken(userPrincipal);

            return new LoginResponse(token);

        } catch (Exception ex) {
            logger.error("Falha na autenticação para usuário {}: {}", request.getEmail(), ex.getMessage());
            throw ex;  
        }
    }
}
