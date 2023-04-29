package com.springreact.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.springreact.model.User;

public interface userRepository extends JpaRepository<User, Integer>{
    
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    @Query("SELECT u FROM User u WHERE u.register_code = :code")
    Optional<User> findByRegisterCode(@Param("code") String code);

}
