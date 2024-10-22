package com.fams.fixedasset.assetmanagement.WriteOff;

import com.fams.fixedasset.assetmanagement.Transfer.Transfer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

@Repository
public interface WriteOffRepository extends JpaRepository<WriteOff, Long> {
    WriteOff getWriteOffByAssetCode(@PathVariable String assetCode);
}
