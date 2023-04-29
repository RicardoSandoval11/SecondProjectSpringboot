package com.springreact.customeObjects;

import org.springframework.web.multipart.MultipartFile;

public class createPropertyDTO {
    
    private String title;
    private String description;
    private String location;
    private Integer rooms;
    private Integer parking;
    private Integer wc;
    private Integer published;
    private Integer categoryId;
    private Integer priceId;
    private String username;
    private MultipartFile image;
    private String status;
    
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
    }
    public Integer getRooms() {
        return rooms;
    }
    public void setRooms(Integer rooms) {
        this.rooms = rooms;
    }
    public Integer getParking() {
        return parking;
    }
    public void setParking(Integer parking) {
        this.parking = parking;
    }
    public Integer getWc() {
        return wc;
    }
    public void setWc(Integer wc) {
        this.wc = wc;
    }
    public Integer getPublished() {
        return published;
    }
    public void setPublished(Integer published) {
        this.published = published;
    }
    public Integer getCategoryId() {
        return categoryId;
    }
    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }
    public Integer getPriceId() {
        return priceId;
    }
    public void setPriceId(Integer priceId) {
        this.priceId = priceId;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public MultipartFile getImage() {
        return image;
    }
    public void setImage(MultipartFile image) {
        this.image = image;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "createPropertyDTO [title=" + title + ", description=" + description + ", location=" + location
                + ", rooms=" + rooms + ", parking=" + parking + ", wc=" + wc + ", published=" + published
                + ", categoryId=" + categoryId + ", priceId=" + priceId + ", username=" + username + ", image=" + image
                + ", status=" + status + "]";
    }

}
