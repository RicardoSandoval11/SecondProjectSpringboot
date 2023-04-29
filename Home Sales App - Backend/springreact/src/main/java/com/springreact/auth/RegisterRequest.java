package com.springreact.auth;

import java.util.Date;

import com.springreact.model.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    
    private String name;
    private String email;
    private String username;
    private String password;
    private Integer status;
    private Role role;
    private String register_code;
    private Date register_date;
}
