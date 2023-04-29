package com.springreact.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
    
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{


        httpSecurity
            .cors().and()
            .csrf()
            .disable()
            .authorizeHttpRequests()
            .requestMatchers("/js/**","/css/**","/")
            .permitAll()
            .requestMatchers("/api/auth/**",
                                        "/imgs/**",
                                        "/api/properties/list-all",
                                        "/api/properties/get-last-four-properties", 
                                        "/api/properties/get-last-four-departments",
                                        "/api/properties/get-last-four-other",
                                        "/api/properties/details/**",
                                        "/api/properties/all**",
                                        "/api/prices/all",
                                        "/api/category/all",
                                        "/api/properties/filter-category/**",
                                        "/api/properties/number-sold-properties-user/**",
                                        "/api/user/get-user-public-details/**",
                                        "/api/user/request-update-password",
                                        "/api/user/verify-code",
                                        "/api/user/update-password",
                                        "/api/category/all-categories") // Public endpoints
                                        .permitAll()
            .anyRequest()
            .authenticated()
            .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Used to avoid springboot creates sessions for the authenticated users
            .and()
            .authenticationProvider(authenticationProvider)
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return httpSecurity.build();
    }

}
