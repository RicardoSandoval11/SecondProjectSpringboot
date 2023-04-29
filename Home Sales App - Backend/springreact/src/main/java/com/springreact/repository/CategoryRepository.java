package com.springreact.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springreact.customeObjects.customCategory;
import com.springreact.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer>{
    
    @Query("SELECT new com.springreact.customeObjects.customCategory(c.id, c.name, COUNT(p.id)) FROM Category c INNER JOIN Property p WHERE c.id = p.category AND p.published = 1 GROUP BY(p.category)")
    List<customCategory> findAllCategories();
}
