package com.fams.fixedasset.assetmanagement.asset;


import com.fams.fixedasset.assetmanagement.Interfaces.AssetsByCategory;
import com.fams.fixedasset.assetmanagement.Interfaces.AssetsByDepartment;
import com.fams.fixedasset.assetmanagement.VendorDetails.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Repository
public interface Assetrepository extends JpaRepository<Asset, Long> {
  List<Asset> findByDeletedFlag(Boolean deletedFlag);
  List<Asset> findByStatus(String status);
  List<Asset> findByisActive(String isActive);


  @Query(value = "SELECT * FROM assets WHERE category=?1",nativeQuery = true)
  List<Asset> findByCategory(String category);
  @Query(value = "SELECT * FROM assets WHERE department_unit=?1",nativeQuery = true)
  List<Asset> findByDepartment(String department);

  @Modifying
  @Query("update Asset asset set asset.cost = :cost where asset.id = :id")
  void updateCost(@Param("id") Long id, @Param("cost") Double cost);

  Asset getAssetByid(@PathVariable Long id);
  Asset getAssetByAssetCode(@PathVariable String assetCode);
  @Query(value = "SELECT COUNT(*) FROM assets",nativeQuery = true)
  int getAssetCount();
  @Query(value = "SELECT SUM(cost) FROM assets",nativeQuery = true)
  Double getTotalCost();
  @Query(value = "select category,count(*),sum(cost) from assets group by category",nativeQuery = true)
  List<?> valueByCategory();
  @Query(value = "select category as category,count(*) as  numberOfAssets,sum(cost) as valueOfAssets from assets group by category",nativeQuery = true)
  List<AssetsByCategory> getCategoryAssets();

  @Query(value = "select department as department,count(*) as  numberOfAssets,sum(cost) as valueOfAssets from assets group by category",nativeQuery = true)
  List<AssetsByDepartment> getDepartmentAssets();

  @Query(value = "SELECT `COLUMN_NAME`  FROM `INFORMATION_SCHEMA`.`COLUMNS` WHERE `TABLE_SCHEMA`='fixedassets' AND `TABLE_NAME`='assets'",nativeQuery = true)
  List<?> getColumns();

  @Query(value = "select department.department_name as Department,count(*) as numberOfAssets,sum(assets.cost) as value from department join department_unit on department.id =department_unit.department_fk JOIN assets on department_unit.id =assets.department_unit_fk GROUP  BY department.department_name",nativeQuery = true)
  List<AssetsByDepartment> findAssetsBydepartment();
}

//  select count(*),sum(cost) from assets where category="Buildings"
// select sum(cost) from assets where category="Buildings"
// select category,count(*),sum(cost) from assets group by category

// asset by department units
// select department_unit, count(*),sum(cost) as value from assets;


// create table assetbydepartmentunit( id INT PRIMARY KEY AUTO_INCREMENT,departmentunit
// VARCHAR(255), numberofassets VARCHAR(255), valueofassets VARCHAR(255));
// select department.department_name as DepartmentName,count(*) as assetCount,sum(assets.cost) as
// assetvalue from department join department_unit on department.id =department_unit.department_fk
// JOIN assets on department_unit.id =assets.department_unit_fk GROUP  BY
// department.department_name;
// +------------------------+------------+------------+
//-- SELECT  subcounty as location,COUNT(*) as assetCount ,SUM(assets.cost)   from location join assets  on location.id  = location_fk GROUP  By location_fk ;
//-- SELECT category.category_name  as category ,COUNT(*) as assetCount , SUM(assets.cost) from category join assets on  category.id = category_fk group by category_fk;//