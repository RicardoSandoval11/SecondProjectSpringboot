package com.springreact.customeObjects;

import org.springframework.beans.factory.annotation.Qualifier;

import com.springreact.model.Category;
import com.springreact.model.Price;
import com.springreact.model.User;


public class customProperty {

    private Integer id;
    private String title;
    private String location;
    private String image;
    private Integer published;
    private Price price;
    private Category category;
    private User user;
    private String description;
    private String status;
    
    public customProperty(
        @Qualifier("id") Integer id,
        @Qualifier("title") String title,
        @Qualifier("location") String location,
        @Qualifier("image") String image,
        @Qualifier("published") Integer published,
        @Qualifier("priceId") Price price,
        @Qualifier("categoryId") Category category,
        @Qualifier("userId") User user,
        @Qualifier("description") String description,
        @Qualifier("status") String status
    ){
        super();
        this.id = id;
        this.title = title;
        this.location = location;
        this.image = image;
        this.published = published;
        this.price = price;
        this.category = category;
        this.user = user;
        this.description = description;
        this.status = status;
    }

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "customProperty [id=" + id + ", title=" + title + ", location=" + location + ", image=" + image
                + ", published=" + published + ", price=" + price + ", category=" + category + ", user=" + user
                + ", description=" + description + ", status=" + status + "]";
    }
    
}
