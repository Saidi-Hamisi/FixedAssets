package com.fams.fixedasset.assetmanagement.Transfer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

@Repository
public interface TransferRepository extends JpaRepository<Transfer, Long> {
    Transfer getTransferByAssetCode(@PathVariable String assetCode);
}
