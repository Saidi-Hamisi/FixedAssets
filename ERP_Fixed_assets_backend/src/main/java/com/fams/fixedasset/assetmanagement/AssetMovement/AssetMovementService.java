package com.fams.fixedasset.assetmanagement.AssetMovement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.util.List;

@Service
public class AssetMovementService {

    @Autowired
    private AssetMovementRepository assetMovementRepository;

    public AssetMovement newAssetmovement(AssetMovement assetmovement){
        DecimalFormat df = new DecimalFormat("#.00");
        Double  sum =assetmovement.getBiologicalAssets()+assetmovement.getBuildings() + assetmovement.getCurrentAssets()+ assetmovement.getBuildings()+ assetmovement.getComputers()+ assetmovement.getEquipment()+ assetmovement.getFurniture()+ assetmovement.getVehicles();
        Double totals = Double.valueOf(df.format(sum));
        assetmovement.setTotal(totals);
       return  assetMovementRepository.save(assetmovement);
    }
    public List<AssetMovement> getAssetmovement(){
        return  assetMovementRepository.fetchAssetMovementRecords();
    }
    public AssetMovement updateAssetMovement(AssetMovement assetmovement){
        return  assetMovementRepository.save(assetmovement);
    }
    public void deleteAssetMovement(Long id){
        assetMovementRepository.deleteById(id);
    }
    public AssetMovement getByid(Long id){
      return   assetMovementRepository.getById(id);
    }


}
