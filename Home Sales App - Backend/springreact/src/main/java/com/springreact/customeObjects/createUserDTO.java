package com.springreact.customeObjects;

import org.springframework.web.multipart.MultipartFile;

public class createUserDTO {
    
    private Integer id;
    private String name;
    private String email;
    private String username;
    private MultipartFile photo_url;
    private String description;
    
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public MultipartFile getPhoto_url() {
        return photo_url;
    }
    public void setPhoto_url(MultipartFile photo_url) {
        this.photo_url = photo_url;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "createUserDTO [id=" + id + ", name=" + name + ", email=" + email + ", username=" + username
                + ", photo_url=" + photo_url + ", description=" + description + "]";
    }
    
}
