package com.springreact.service.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springreact.customeObjects.customPrice;
import com.springreact.model.Price;
import com.springreact.repository.PriceRepository;
import com.springreact.service.interfaces.IPriceService;

@Service
public class PriceService implements IPriceService{

    @Autowired
    private PriceRepository priceRepository;
    
    @Override
    public List<customPrice> getAllPrices(){
        return priceRepository.findallPrices();
    }

    @Override
    public Price getPriceById(Integer priceId){
        Optional<Price> optional = priceRepository.findById(priceId);
        if(optional.isPresent()){
            return optional.get();
        }
        return null;
    }
}
