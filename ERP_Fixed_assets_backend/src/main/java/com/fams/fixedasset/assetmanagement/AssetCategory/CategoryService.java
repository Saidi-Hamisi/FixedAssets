package com.fams.fixedasset.assetmanagement.AssetCategory;

import com.fams.fixedasset.assetmanagement.Interfaces.AssetByCategory;
import com.fams.fixedasset.assetmanagement.codegenerator.Codegenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public Category newcategory(Category category){
        category.setDeletedFlag(false);
        String categoryNameString = category.getCategoryName();
        System.out.println("Category" + categoryNameString);

        Character char1= categoryNameString.charAt(0);
        Character char2= categoryNameString.charAt(1);
        Character char3= categoryNameString.charAt(2);
        String catCode= new StringBuilder().append(char1).append(char2).append(char3).toString().toUpperCase();
        Codegenerator codegenerator = new Codegenerator();
        String randomeString = codegenerator.randomString();

        String finalcode = String.join("/",catCode,randomeString);
        System.out.println("Department code is " + finalcode);
        category.setCategoryCode(finalcode);
        return categoryRepository.save(category);
    }
    public List<Category> getCategories(){
        return categoryRepository.findByDeletedFlag(false);
    }

    public Category updateCategory(Category category){
        category.setDeletedFlag(false);
        return categoryRepository.save(category);
    }

    public Category getCategoryByid(Long id){
       return categoryRepository.getCategoryByid(id);
    }
    public  void deleteCategory(Long id){
        Category category= categoryRepository.getCategoryByid(id);
        category.setDeletedFlag(true);
        categoryRepository.save(category);
    }
    public List<AssetByCategory> assetByCategories(){
        return  categoryRepository.getAssetsByCategory();
    }
    public  List<AssetByCategory> findAssetsByCategory(){
        return categoryRepository.findAssetsByCategory();
    }
}
