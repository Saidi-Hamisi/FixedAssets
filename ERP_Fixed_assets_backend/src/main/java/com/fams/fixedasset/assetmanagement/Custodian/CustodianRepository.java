package com.fams.fixedasset.assetmanagement.Custodian;

import com.fams.fixedasset.assetmanagement.asset.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Repository
public interface CustodianRepository extends JpaRepository<Custodian,Long> {
    List<Custodian> findByDeletedFlag(Boolean deletedFlag);

    Custodian getCustodianByid(@PathVariable Long id);
    @Query(value = "select email from custodian where custodian_name =:custodian_name",nativeQuery = true)
    String getemail(@Param("custodian_name")String custodian_name);
}
