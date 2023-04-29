package com.springreact.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springreact.customeObjects.customPrice;
import com.springreact.model.Price;

public interface PriceRepository extends JpaRepository<Price, Integer>{
    
    @Query("SELECT new com.springreact.customeObjects.customPrice(p.id, p.value) FROM Price p")
    List<customPrice> findallPrices();
}
