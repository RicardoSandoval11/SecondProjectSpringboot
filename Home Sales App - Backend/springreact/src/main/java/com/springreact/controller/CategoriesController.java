package com.springreact.controller;

import com.springreact.customeObjects.customCategory;
import com.springreact.model.Category;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springreact.service.interfaces.ICategoryService;

@RestController
@RequestMapping("/api/category")
public class CategoriesController {

    @Autowired
    private ICategoryService categoryService;
    
    @GetMapping("/all")
    public List<customCategory> showAllCategories(){
        return categoryService.getAllCategories();
    }

    @GetMapping("/all-categories")
    public List<Category> showCategories(){
        return categoryService.getCategories();
    }
}
