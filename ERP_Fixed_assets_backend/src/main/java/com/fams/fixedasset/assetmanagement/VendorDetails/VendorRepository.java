package com.fams.fixedasset.assetmanagement.VendorDetails;

import com.fams.fixedasset.assetmanagement.Maintenance.Maintenance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Repository
public interface VendorRepository  extends JpaRepository<Vendor, Long> {
//    @Query("SELECT v FROM Vendor v WHERE v.asset = :id")
//    Vendor getVendor(@PathVariable Long id);
//    @Query("SELECT assets.assetName AS VENDORS.VENDORSNAME FROM ASSET JOIN VENDORS ON ASSET.ID = VENDORS.ASSET_ID");
//    @Query("SELECT vendor.vendorName vendor.address FROM vendor JOIN assets ON vendor.id = asset_id");
//    public List<Vendor> findByAsset_id(Integer id);
//    Vendor findByAsset_id(Long id);

//    Vendor getbyAsset_id(Long id);
//    @Query("select v from Vendor v where v.asset_id =?1")
//    public List<Vendor> findByAsset_id(Long id);
//
//    @Query("SELECT v FROM Vendor v WHERE v.asset_id = ?1")
//    List<Vendor> findByAsset_id(Long id);
    @Query(value = " select * from maintenance where asset_id=:assetid",nativeQuery = true)
    List<Vendor> getVendor(@Param("assetid")Long assetid);

}
