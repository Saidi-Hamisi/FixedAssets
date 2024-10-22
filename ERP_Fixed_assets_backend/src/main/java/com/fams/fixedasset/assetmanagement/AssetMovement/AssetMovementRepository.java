package com.fams.fixedasset.assetmanagement.AssetMovement;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Repository
public interface AssetMovementRepository extends JpaRepository<AssetMovement, Long> {
    @Query(value = "select * from asset_movement group by id order by total desc",nativeQuery = true)
    List<AssetMovement> fetchAssetMovementRecords();

    AssetMovement getById(@PathVariable  Long id);

    //    @Query(value = "sum(biological_assets+ buildings+computers+ current_assets+ equipment+ furniture+ land+ vehicles) as total from asset_movement group by id order by total desc",nativeQuery = true)
//    List<AssetMovement> fetchAssetMovementRecords();
}
