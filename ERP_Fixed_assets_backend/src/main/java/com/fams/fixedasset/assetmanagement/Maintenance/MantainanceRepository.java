package com.fams.fixedasset.assetmanagement.Maintenance;

import com.fams.fixedasset.assetmanagement.Depreciation.Depreciation;
import com.fams.fixedasset.assetmanagement.Warranty.Warranty;
import com.fams.fixedasset.assetmanagement.asset.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Repository
public interface MantainanceRepository extends JpaRepository<Maintenance, Long> {

//    @Query("SELECT m FROM Maintenance m WHERE m.asset_id = ?1")
//    List<Maintenance> findByAsset_id(Long id);
//    Maintenance getMaintenanceById(@PathVariable Long id);

    @Query(value = "update maintenance set next_maint_date =DATE_ADD(maint_date, INTERVAL days DAY) where asset_id=:assetid",nativeQuery = true)
    void   updateMaintenance(@Param("assetid") Long assetid);

    @Query(value = " select * from maintenance where asset_id=:assetid",nativeQuery = true)
    List<Maintenance> getMaintenance(@Param("assetid") Long assetid);

    List<Maintenance> findAllByAssetId(String assetId);
}
