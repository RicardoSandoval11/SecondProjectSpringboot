package com.springreact.service.interfaces;

import com.springreact.model.User;

public interface IUserService {
    
    User getUserById(Integer userId);
    User getUserByUsername(String username);
    User getUserByEmail(String email);
    void updateUser(User user);
    User getUserByCode(String code);
}
