package com.springreact.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import java.util.Date;

import org.springframework.beans.factory.annotation.Qualifier;

@Entity
@Table(name = "tokens", schema = "homesalesappdb")
public class Token {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @OneToOne
    @JoinColumn(name = "userId")
    private User user;
    private String token;
    private Date expires_in;

    public Token(@Qualifier("user") User user, @Qualifier("token") String token, @Qualifier("expires_in") Date expires_in){
        super();
        this.user = user;
        this.token = token;
        this.expires_in = expires_in;
    }
    
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }
    public Date getExpires_in() {
        return expires_in;
    }
    public void setExpires_in(Date expires_in) {
        this.expires_in = expires_in;
    }

    @Override
    public String toString() {
        return "Token [id=" + id + ", user=" + user + ", token=" + token + ", expires_in=" + expires_in + "]";
    }

}
