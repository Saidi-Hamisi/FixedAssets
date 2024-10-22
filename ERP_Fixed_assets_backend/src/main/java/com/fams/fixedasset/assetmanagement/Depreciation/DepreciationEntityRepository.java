package com.fams.fixedasset.assetmanagement.Depreciation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepreciationEntityRepository extends JpaRepository<Depreciation,Long> {
    List<Depreciation> findAllByAssetId(String assetId);
}
