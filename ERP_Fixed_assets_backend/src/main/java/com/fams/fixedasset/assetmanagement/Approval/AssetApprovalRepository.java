package com.fams.fixedasset.assetmanagement.Approval;

import com.fams.fixedasset.assetmanagement.asset.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Repository
public interface AssetApprovalRepository extends JpaRepository<AssetAproval,Long> {
  @Query(value ="select * from asset_aproval where status='Pending review' OR status = 'Rejected'",nativeQuery = true)
  List<AssetAproval> findRequests();

    AssetAproval getRequestById(@PathVariable Long id);
}
