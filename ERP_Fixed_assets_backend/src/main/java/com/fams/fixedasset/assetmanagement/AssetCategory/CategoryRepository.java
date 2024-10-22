package com.fams.fixedasset.assetmanagement.AssetCategory;

import com.fams.fixedasset.assetmanagement.Interfaces.AssetByCategory;
import com.fams.fixedasset.assetmanagement.asset.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByDeletedFlag(Boolean deletedFlag);
    Category getCategoryByid(@PathVariable Long id);


    Category getCategoryByCategoryName(@PathVariable String categoryName);


    @Query(value = "select category,count(*) as numberOfassets, sum(cost) as valueOfassets from assets group by category",nativeQuery = true)
    List<AssetByCategory> getAssetsByCategory();
    @Query(value = "SELECT category.category_name  as category ,COUNT(*) as numberOfAssets , SUM(assets.cost) as valueOfAssets from category join assets on  category.id = category_fk group by category_fk",nativeQuery = true)
    List<AssetByCategory> findAssetsByCategory();



}
