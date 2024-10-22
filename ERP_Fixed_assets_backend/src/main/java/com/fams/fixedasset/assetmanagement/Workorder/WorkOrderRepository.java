package com.fams.fixedasset.assetmanagement.Workorder;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkOrderRepository extends JpaRepository<Workorder, Long> {
}
