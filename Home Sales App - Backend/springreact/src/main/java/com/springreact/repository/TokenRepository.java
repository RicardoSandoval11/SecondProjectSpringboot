package com.springreact.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.springreact.model.Token;
import com.springreact.model.User;

public interface TokenRepository extends JpaRepository<Token, Integer>{
    
    @Query("SELECT new com.springreact.model.Token(t.user, t.token, t.expires_in) FROM Token t WHERE t.user = :user")
    Token findTokenByUser(@Param("user") User user);
}
