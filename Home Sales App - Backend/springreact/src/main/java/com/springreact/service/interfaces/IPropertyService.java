package com.springreact.service.interfaces;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.springreact.customeObjects.customProperty;
import com.springreact.model.Property;
import com.springreact.model.User;

public interface IPropertyService {
    
    Page<customProperty> getAllProperties(Pageable pageable);
    List<customProperty> getLastCreated(Integer categoryId);
    List<customProperty> getlastCreatedOther();
    Property getPropertyById(Integer propertyId);
    Page<customProperty> getPropertiesByFilters(String kword, Integer categoryId, Integer priceId, Date startDate, Date endDate, Pageable pageable);
    Page<customProperty> getpropertiesByCategory(Integer categoryId, Pageable pageable);
    Page<customProperty> getPropertiesByUser(User user, Pageable pageable);
    void deleteProperty(Property property);
    Integer getNumberOfSoldPropertiesByUser(User user);
    void createProperty(Property property);
    void updateProperty(Property property);
    List<Property> getAllPropertiesToExportByUser(User user);
}
