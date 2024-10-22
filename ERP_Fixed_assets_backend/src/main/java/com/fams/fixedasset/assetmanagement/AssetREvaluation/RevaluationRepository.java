package com.fams.fixedasset.assetmanagement.AssetREvaluation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

@Repository
public interface RevaluationRepository extends JpaRepository<Revaluation,Long> {
    Revaluation getByid(@PathVariable Long id);
    Revaluation findByAssetCode(@PathVariable String assetCode);
}
