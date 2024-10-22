package com.fams.fixedasset.assetmanagement.Warranty;

import com.fams.fixedasset.assetmanagement.Insurance.Insurance;
import com.fams.fixedasset.assetmanagement.Location.Location;
import com.fams.fixedasset.assetmanagement.VendorDetails.Vendor;
import com.fams.fixedasset.assetmanagement.asset.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Repository
public interface WarrantyRepository extends JpaRepository<Warranty, Long> {


    @Query(value = " select * from warranty where asset_id=:assetid",nativeQuery = true)
    List<Warranty> getWarrantyByAssetId(@Param("assetid") Long assetid);


//    @Query("select w from Warranty w where w.asset =?1")
//    public List<Warranty> findByAsset_id(Long id);
    // SELECT * FROM student WHERE email = ?;
    @Query("SELECT w FROM Warranty w WHERE w.asset = ?1")
    Optional<Warranty> findStudentByasset(Asset asset);
    Warranty getWarrantyByid(@PathVariable Long id);




}
