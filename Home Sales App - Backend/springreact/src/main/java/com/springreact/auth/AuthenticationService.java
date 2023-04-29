package com.springreact.auth;

import com.springreact.config.JwtService;
import com.springreact.model.Role;
import com.springreact.model.User;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.springreact.repository.userRepository;

import java.util.Date;

import lombok.RequiredArgsConstructor;
import lombok.var;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final userRepository userRepository;
    private final PasswordEncoder PasswordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    
    public AuthenticationResponse register(RegisterRequest request){

        // Used to register users
        var defaultRole = Role.builder().id(3).role_name("User").build();

        var user = User.builder()
                    .name(request.getName())
                    .email(request.getEmail())
                    .username(request.getUsername())
                    .password(PasswordEncoder.encode(request.getPassword()))
                    .status(1)
                    .role(defaultRole)
                    .register_date(new Date())
                    .build();
        
        userRepository.save(user);

        var jwToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder().token(jwToken).build();

    }

    public AuthenticationResponse authenticate(AuthenticationRequest request){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        // At this point, the user is authenticated
        var user = userRepository.findByUsername(request.getUsername()).orElseThrow();

        var jwToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder().token(jwToken).build();
    }
}
