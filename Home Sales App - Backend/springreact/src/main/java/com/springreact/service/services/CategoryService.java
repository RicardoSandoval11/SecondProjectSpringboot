package com.springreact.service.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springreact.customeObjects.customCategory;
import com.springreact.model.Category;
import com.springreact.repository.CategoryRepository;
import com.springreact.service.interfaces.ICategoryService;

@Service
public class CategoryService implements ICategoryService{

    @Autowired
    private CategoryRepository categoryRepository;
    
    @Override
    public List<customCategory> getAllCategories(){
        return categoryRepository.findAllCategories();
    }

    @Override
    public Category getCategoryById(Integer categoryId){
        Optional<Category> optional = categoryRepository.findById(categoryId);
        if (optional.isPresent()) {
            return optional.get();
        }
        return null;
    }

    @Override
    public List<Category> getCategories(){
        return categoryRepository.findAll();
    }
}
