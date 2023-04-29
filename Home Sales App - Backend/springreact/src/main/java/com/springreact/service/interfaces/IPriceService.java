package com.springreact.service.interfaces;

import java.util.List;

import com.springreact.customeObjects.customPrice;
import com.springreact.model.Price;

public interface IPriceService {
    
    List<customPrice> getAllPrices();
    Price getPriceById(Integer priceId);
}
