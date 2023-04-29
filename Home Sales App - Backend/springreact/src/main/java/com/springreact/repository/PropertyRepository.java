package com.springreact.repository;

import java.util.List;
import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.springreact.customeObjects.customProperty;
import com.springreact.model.Property;
import com.springreact.model.User;

public interface PropertyRepository extends JpaRepository<Property, Integer>{
    
    @Query("SELECT new com.springreact.customeObjects.customProperty(p.id, p.title, p.location, p.image, p.published, p.price, p.category, p.user, p.description, p.status) FROM Property p WHERE p.published = 1 AND p.status = 'for sale'")
    Page<customProperty> findAllProperties(Pageable pageable);
    
    @Query("SELECT new com.springreact.customeObjects.customProperty(p.id, p.title, p.location, p.image, p.published, p.price, p.category, p.user, p.description, p.status) FROM Property p WHERE p.published = 1 AND p.category.id = :categoryId ORDER BY p.createdAt DESC LIMIT 4")
    List<customProperty> findLastFourCreatedProperties(@Param("categoryId") Integer categoryId);

    @Query("SELECT new com.springreact.customeObjects.customProperty(p.id, p.title, p.location, p.image, p.published, p.price, p.category, p.user, p.description, p.status) FROM Property p WHERE p.published = 1 AND (p.category.name not like '%house%' AND p.category.name NOT LIKE '%department%') ORDER BY p.createdAt DESC LIMIT 4")
    List<customProperty> findLastFourCreatedOther();

    @Query("SELECT new com.springreact.customeObjects.customProperty(p.id, p.title, p.location, p.image, p.published, p.price, p.category, p.user, p.description, p.status) FROM Property p WHERE (p.title LIKE %:kword% OR p.description LIKE %:kword%) AND p.category.id=:categoryId AND p.price.id=:priceId AND (p.updatedAt BETWEEN :startDate AND :endDate) AND p.published = 1 AND p.status = 'for sale'")
    Page<customProperty> findByFilter(
            @Param("kword") String titleWord, 
            @Param("categoryId") Integer categoryId,
            @Param("priceId") Integer priceId,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            Pageable pageable);
    
    @Query("SELECT new com.springreact.customeObjects.customProperty(p.id, p.title, p.location, p.image, p.published, p.price, p.category, p.user, p.description, p.status) FROM Property p WHERE p.published = 1 AND p.category.id = :categoryId")
    Page<customProperty> findAllPropertiesByCategory(@Param("categoryId") Integer categoryId, Pageable pageable);

    @Query("SELECT new com.springreact.customeObjects.customProperty(p.id, p.title, p.location, p.image, p.published, p.price, p.category, p.user, p.description, p.status) FROM Property p WHERE p.user = :user")
    Page<customProperty> findPropertiesByUser(@Param("user") User user, Pageable pageable);

    @Query("SELECT COUNT(p.id) FROM Property p INNER JOIN User u ON p.user = u.id WHERE p.status = 'sold' AND p.user = :seller GROUP BY p.user")
    Integer findNumberOfSoldPropertiesByUser(@Param("seller") User user);

    List<Property> findByUser(User user, Sort sort);
}
