package com.fams.fixedasset.assetmanagement.AssetCategory;


import com.fams.fixedasset.assetmanagement.Response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin
@RestController
@RequestMapping(path = "api/categories")
public class CategoryController {

        @Autowired
        private CategoryService categoryService;

        @PostMapping(path = "add_category")
        public ResponseEntity<?> addCategory(@RequestBody Category category){
            categoryService.newcategory(category);
            return ResponseEntity.ok().body(new Response("new Category added successfully"));
        }
        @GetMapping(path = "get_categories")
        public ResponseEntity<?> getCategories(){
            return  ResponseEntity.ok().body(categoryService.getCategories());
        }
    @PutMapping(path = "updateCategory")
    public ResponseEntity<?> udpateCatgoryInfo(@RequestBody Category category){
        categoryService.updateCategory(category);
        return  ResponseEntity.ok().body(new Response("Category updated successfully"));
    }
    @DeleteMapping(path = "deleteCategory/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id){
        categoryService.deleteCategory(id);
        return  ResponseEntity.ok().body(new Response("Category deleted successfully"));
    }
    @GetMapping(path = "getCategory/{id}")
    public ResponseEntity<?> getCategory(@PathVariable Long id){
        return  ResponseEntity.ok().body( categoryService.getCategoryByid(id));
    }
//    @GetMapping(path = "assets")
//    public ResponseEntity<?> getAssetsbycategories(){
//            return  ResponseEntity.ok().body(categoryService.assetByCategories());
//    }
    @GetMapping(path = "assets")
    public ResponseEntity<?> getByCategory(){
        return  ResponseEntity.ok().body(categoryService.findAssetsByCategory());
    }


}
