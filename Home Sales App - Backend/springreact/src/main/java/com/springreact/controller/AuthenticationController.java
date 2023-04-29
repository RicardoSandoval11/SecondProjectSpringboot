package com.springreact.controller;
import com.springreact.auth.AuthenticationRequest;
import com.springreact.auth.AuthenticationResponse;
import com.springreact.auth.AuthenticationService;
import com.springreact.auth.RegisterRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;
    
    // Register
    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody RegisterRequest request){
        try {
            return ResponseEntity.ok(service.register(request));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // Authentication
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(service.authenticate(request));
    }
}
