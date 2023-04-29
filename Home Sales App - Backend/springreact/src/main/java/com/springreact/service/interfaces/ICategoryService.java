package com.springreact.service.interfaces;

import java.util.List;

import com.springreact.customeObjects.customCategory;
import com.springreact.model.Category;

public interface ICategoryService {
    
    List<customCategory> getAllCategories();
    Category getCategoryById(Integer categoryId);
    List<Category> getCategories();
}
