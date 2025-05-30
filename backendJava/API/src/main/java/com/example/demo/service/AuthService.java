package com.example.demo.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.User;
import com.example.demo.model.LoginRequest;
import com.example.demo.repository.UserRepository;

@Service
public class AuthService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    @Autowired
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    public Map<String, Object> login(LoginRequest loginRequest) {
        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());
        
        if (userOptional.isEmpty()) {
            throw new BadCredentialsException("Usuário não encontrado");
        }
        
        User user = userOptional.get();
        
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Senha incorreta");
        }
        
        if (!user.isActive()) {
            throw new BadCredentialsException("Usuário desativado");
        }
        
        // Aqui você poderia gerar um token JWT se estiver usando autenticação baseada em token
        
        Map<String, Object> response = new HashMap<>();
        response.put("userId", user.getId());
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        response.put("userType", user.getType().name());
        response.put("message", "Login realizado com sucesso");
        
        return response;
    }
}