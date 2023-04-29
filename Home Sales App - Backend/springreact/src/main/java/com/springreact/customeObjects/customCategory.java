package com.springreact.customeObjects;

import org.springframework.beans.factory.annotation.Qualifier;

public class customCategory {
    
    private Integer id;
    private String name;
    private Long propertiesNumber;

    public customCategory(@Qualifier("id") Integer id, @Qualifier("name") String name, @Qualifier("properties") Long propertiesNumber){
        super();
        this.id = id;
        this.name = name;
        this.propertiesNumber = propertiesNumber;
    }

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

    public Long getPropertiesNumber() {
        return propertiesNumber;
    }

    public void setPropertiesNumber(Long propertiesNumber) {
        this.propertiesNumber = propertiesNumber;
    }

    @Override
    public String toString() {
        return "customCategory [id=" + id + ", name=" + name + ", propertiesNumber=" + propertiesNumber + "]";
    }

}
