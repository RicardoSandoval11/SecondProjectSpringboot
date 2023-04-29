package com.springreact.config;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor // Creates automatically constructors
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    // Class to extract email from jwt
    private final JwtService jwtService;

    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request, 
            HttpServletResponse response, 
            FilterChain filterChain)
            throws ServletException, IOException {

        // Verify if the request contains jwt
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response); // Continue with the next filter
            return;
        }

        // Extracts the jwt
        jwt = authHeader.substring(7);
        
        userEmail = jwtService.extractUsername(jwt);

        // Verify if the username/email was extracted and the user is not authenticated yet
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null){

            // Getting user details from the database
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);

            // Verify if the token is valid or not
            if (jwtService.isTokenValid(jwt, userDetails)) {


                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                authToken.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(request)
                );

                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // Next filter is executed
        filterChain.doFilter(request, response);
    }

}
