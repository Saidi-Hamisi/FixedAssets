package com.fams.fixedasset.assetmanagement.profitLoss;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfitLossRepository  extends JpaRepository<ProfitLoss,Long> {
}
