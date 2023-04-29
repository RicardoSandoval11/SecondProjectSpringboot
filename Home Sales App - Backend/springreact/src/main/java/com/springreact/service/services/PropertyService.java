package com.springreact.service.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.springreact.customeObjects.customProperty;
import com.springreact.model.Property;
import com.springreact.model.User;
import com.springreact.repository.PropertyRepository;
import com.springreact.service.interfaces.IPropertyService;

@Service
public class PropertyService implements IPropertyService{

    @Autowired
    private PropertyRepository propertyRepository;

    @Override
    public Page<customProperty> getAllProperties(Pageable pageable) {
            return propertyRepository.findAllProperties(pageable);
    }

    @Override
    public List<customProperty> getLastCreated(Integer categoryId){
        return propertyRepository.findLastFourCreatedProperties(categoryId);
    }

    @Override
    public List<customProperty> getlastCreatedOther(){
        return propertyRepository.findLastFourCreatedOther();
    }

    @Override
    public Property getPropertyById(Integer propertyId){
        Optional<Property> optional = propertyRepository.findById(propertyId);
        if (optional.isPresent()) {
            return optional.get();
        }
        return null;
    }

    @Override
    public Page<customProperty> getPropertiesByFilters(String kword, Integer categoryId, Integer priceId, Date startDate, Date endDate, Pageable pageable){
        return propertyRepository.findByFilter(kword, categoryId, priceId, startDate, endDate, pageable);
    }

    @Override
    public Page<customProperty> getpropertiesByCategory(Integer categoryId, Pageable pageable){
        return propertyRepository.findAllPropertiesByCategory(categoryId, pageable);
    }

    @Override
    public Page<customProperty> getPropertiesByUser(User user, Pageable pageable){
        return propertyRepository.findPropertiesByUser(user, pageable);
    }

    @Override
    public void deleteProperty(Property property){
        propertyRepository.delete(property);
    }

    @Override
    public Integer getNumberOfSoldPropertiesByUser(User user){
        return propertyRepository.findNumberOfSoldPropertiesByUser(user);
    }

    @Override
    public void createProperty(Property property){
        propertyRepository.save(property);
    }

    @Override
    public void updateProperty(Property property){
        propertyRepository.save(property);
    }

    @Override
    public List<Property> getAllPropertiesToExportByUser(User user){
        return propertyRepository.findByUser(user, Sort.by("createdAt").descending());
    }

}
