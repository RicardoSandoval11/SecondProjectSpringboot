package com.springreact.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springreact.model.Role;

public interface RoleRepository extends JpaRepository<Role, Integer>{
    
}
