package com.fams.fixedasset.assetmanagement.Insurance;

import com.fams.fixedasset.assetmanagement.Maintenance.Maintenance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InsuranceRepository extends JpaRepository<Insurance, Long> {

    @Query(value = " select * from maintenance where asset_id=:assetid",nativeQuery = true)
    List<Insurance> getInsurance(@Param("assetid") Long assetid);
}
