package com.fams.fixedasset.assetmanagement.Depreciation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepreciationRepository extends JpaRepository<DepreciationMethods,Long> {
}
