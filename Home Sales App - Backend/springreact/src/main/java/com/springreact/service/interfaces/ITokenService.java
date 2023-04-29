package com.springreact.service.interfaces;

import com.springreact.model.Token;
import com.springreact.model.User;

public interface ITokenService {
    
    Token getTokenByUser(User user); 
}
