package com.springreact.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springreact.customeObjects.customPrice;
import com.springreact.service.interfaces.IPriceService;

@RestController
@RequestMapping("/api/prices")
@CrossOrigin(origins = "*")
public class PricesController {

    @Autowired
    private IPriceService priceService;
    
    @GetMapping("/all")
    public List<customPrice> showALlPrices(){
        return priceService.getAllPrices();
    }
}
