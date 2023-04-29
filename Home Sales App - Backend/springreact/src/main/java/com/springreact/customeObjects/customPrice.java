package com.springreact.customeObjects;

import org.springframework.beans.factory.annotation.Qualifier;


public class customPrice {
    
    private Integer id;
    private String value;

    public customPrice (@Qualifier("id") Integer id, @Qualifier("value") String value) {
        super();
        this.id = id;
        this.value = value;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "customPrice [id=" + id + ", value=" + value + "]";
    }
 
}
