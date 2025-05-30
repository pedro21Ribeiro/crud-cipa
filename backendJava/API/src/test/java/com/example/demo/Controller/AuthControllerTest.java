package com.example.demo.Controller;

import com.example.demo.Services.AuthService;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class AuthControllerTest {

    @InjectMocks
    private AuthController authController;

    @Mock
    private AuthService authService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testLogin_Success() {
        
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("user@example.com");
        loginRequest.setPassword("password123");

        LoginResponse loginResponse = new LoginResponse("fake-jwt-token");

        when(authService.authenticate(any(LoginRequest.class))).thenReturn(loginResponse);

        
        ResponseEntity<LoginResponse> response = authController.login(loginRequest);

        
        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("fake-jwt-token", response.getBody().getToken());

        verify(authService, times(1)).authenticate(loginRequest);
    }
}
