package com.example.demo.Security;

import jakarta.servlet.http.HttpServletRequest;

public class JwtUtils {
    public static boolean hasBearerToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        return header != null && header.startsWith("Bearer ");
    }
}
