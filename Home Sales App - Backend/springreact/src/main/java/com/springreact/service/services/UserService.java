package com.springreact.service.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springreact.model.User;
import com.springreact.repository.userRepository;
import com.springreact.service.interfaces.IUserService;

@Service
public class UserService implements IUserService{
    
    @Autowired
    private userRepository userRepository;

    @Override
    public User getUserById(Integer userId){
        Optional<User> optional = userRepository.findById(userId);
        if (optional.isPresent()) {
            return optional.get();
        }
        return null;
    }

    @Override
    public User getUserByUsername(String username){
        return userRepository.findByUsername(username).get();
    }

    @Override
    public User getUserByEmail(String email){
        Optional<User> optional = userRepository.findByEmail(email);
        if(optional.isPresent()){
            return optional.get();
        }
        return null;
    }

    @Override
    public void updateUser(User user){
        userRepository.save(user);
    }

    @Override
    public User getUserByCode(String code){
        Optional<User> optional = userRepository.findByRegisterCode(code);
        if(optional.isPresent()){
            return optional.get();
        }
        return null;
    }
}
