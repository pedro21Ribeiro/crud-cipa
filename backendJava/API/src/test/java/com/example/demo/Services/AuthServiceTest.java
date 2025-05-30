package com.example.demo.Services;

import com.example.demo.Security.JwtTokenProvider;
import com.example.demo.Security.UserPrincipal;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class AuthServiceTest {

    @InjectMocks
    private AuthService authService;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtTokenProvider jwtTokenProvider;

    @Mock
    private Authentication authentication;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAuthenticate_Success() {
        
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("user@example.com");
        loginRequest.setPassword("password123");

        UserPrincipal userPrincipal = mock(UserPrincipal.class);
        when(authentication.getPrincipal()).thenReturn(userPrincipal);
        when(authentication.isAuthenticated()).thenReturn(true);

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authentication);

        when(jwtTokenProvider.generateToken(userPrincipal)).thenReturn("fake-jwt-token");

        
        LoginResponse response = authService.authenticate(loginRequest);

        
        assertNotNull(response);
        assertEquals("fake-jwt-token", response.getToken());

        verify(authenticationManager, times(1)).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(jwtTokenProvider, times(1)).generateToken(userPrincipal);
    }

    @Test
    void testAuthenticate_Failure() {
        
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("user@example.com");
        loginRequest.setPassword("wrongpassword");

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new RuntimeException("Bad credentials"));

        
        RuntimeException thrown = assertThrows(RuntimeException.class, () -> {
            authService.authenticate(loginRequest);
        });

        assertEquals("Bad credentials", thrown.getMessage());

        verify(authenticationManager, times(1)).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(jwtTokenProvider, never()).generateToken(any());
    }
}
