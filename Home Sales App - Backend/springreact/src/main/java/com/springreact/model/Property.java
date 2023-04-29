package com.springreact.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "properties", schema = "homesalesappdb")
public class Property {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    private String description;
    private Integer rooms;
    private Integer parking;
    private Integer wc;
    private String location;
    private String image;
    private Integer published;
    private Date createdAt;
    private Date updatedAt;
    @OneToOne
    @JoinColumn(name = "priceId")
    private Price price;
    @OneToOne
    @JoinColumn(name = "categoryId")
    private Category category;
    @OneToOne
    @JoinColumn(name = "userId")
    private User user;
    private String status;
    
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
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
    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
    }
    public String getImage() {
        return image;
    }
    public void setImage(String image) {
        this.image = image;
    }
    public Integer getPublished() {
        return published;
    }
    public void setPublished(Integer published) {
        this.published = published;
    }
    public Date getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
    public Date getUpdatedAt() {
        return updatedAt;
    }
    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
    public Price getPrice() {
        return price;
    }
    public void setPrice(Price price) {
        this.price = price;
    }
    public Category getCategory() {
        return category;
    }
    public void setCategory(Category category) {
        this.category = category;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    @Override
    public String toString() {
        return "Property [id=" + id + ", title=" + title + ", description=" + description + ", rooms=" + rooms
                + ", parking=" + parking + ", wc=" + wc + ", location=" + location + ", image=" + image + ", published="
                + published + ", createdAt=" + createdAt + ", updatedAt=" + updatedAt + ", price=" + price
                + ", category=" + category + ", user=" + user + ", status=" + status + "]";
    }


}
