package com.fams.fixedasset.assetmanagement.AssetDisposal;

import com.fams.fixedasset.assetmanagement.Transfer.Transfer;
import com.fams.fixedasset.assetmanagement.asset.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Repository
public interface AssetDisposalRepository extends JpaRepository<AssetDisposal,Long> {
    AssetDisposal getDisposalByAssetCode(@PathVariable String assetCode);
    List<AssetDisposal> findByStatus(String status);
    List<AssetDisposal> findByAssetState(String isActive);

}
