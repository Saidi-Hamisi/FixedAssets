package com.fams.fixedasset.assetmanagement.Location;

import com.fams.fixedasset.assetmanagement.Interfaces.AssetbyLocation;
import com.fams.fixedasset.assetmanagement.Interfaces.AssetsByLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;


@Repository
public interface LocationRepository extends JpaRepository<Location,Long> {
    List<Location> findByDeleteFlag(Boolean deleteFlag);

    Location getLocationByid(@PathVariable Long id);
    Location getLocationByWard(@PathVariable String ward);

    @Query(value = "SELECT location as word, COUNT(*) as numberofAssets,SUM(cost) as valueofassets  from assets group by location",nativeQuery = true)
    List<AssetbyLocation> getAssetsBylocation();

    @Query(value = "SELECT  subcounty as subcounty,COUNT(*) as numberOfAssets ,SUM(assets.cost)  as valueOfAssets from location join assets  on location.id  = location_fk GROUP  By location_fk",nativeQuery = true)
    List<AssetsByLocation> findAssetsBylocation();
}
