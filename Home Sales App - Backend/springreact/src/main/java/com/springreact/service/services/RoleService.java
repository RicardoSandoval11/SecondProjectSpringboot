package com.springreact.service.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springreact.model.Role;
import com.springreact.repository.RoleRepository;
import com.springreact.service.interfaces.IRoleService;

@Service
public class RoleService implements IRoleService{
    
    @Autowired 
    private RoleRepository roleRepository;

    @Override
    public List<Role> getAllRoles(){
        return roleRepository.findAll();
    }
}
