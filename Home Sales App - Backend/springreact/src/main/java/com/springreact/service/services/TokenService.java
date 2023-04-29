package com.springreact.service.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springreact.model.Token;
import com.springreact.model.User;
import com.springreact.repository.TokenRepository;
import com.springreact.service.interfaces.ITokenService;

@Service
public class TokenService implements ITokenService{
    
    @Autowired
    private TokenRepository tokenRepository;

    @Override
    public Token getTokenByUser(User user){
        return tokenRepository.findTokenByUser(user);
    }
}
