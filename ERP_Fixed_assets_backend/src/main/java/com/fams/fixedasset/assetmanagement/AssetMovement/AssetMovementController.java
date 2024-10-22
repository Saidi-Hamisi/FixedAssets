package com.fams.fixedasset.assetmanagement.AssetMovement;


import com.fams.fixedasset.assetmanagement.Response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@CrossOrigin
@RestController
@RequestMapping(path = "api/asset/assetmovement")
public class AssetMovementController {
    @Autowired
    private AssetMovementService assetMovementService;
    @PostMapping(path = "add")
    public ResponseEntity<Response> createAssetmovement(@RequestBody AssetMovement assetMovement){
        assetMovementService.newAssetmovement(assetMovement);
        return ResponseEntity.ok().body(new Response("Asset movement has been added"));
    }
    @GetMapping(path = "fetch")
    public ResponseEntity<?> fetchAssetmovements(){
        return ResponseEntity.ok().body(assetMovementService.getAssetmovement());
    }
    @PutMapping(path = "update")
    public ResponseEntity<Response> updateAssetmovement(@RequestBody AssetMovement assetMovement){
        assetMovementService.updateAssetMovement(assetMovement);
        return ResponseEntity.ok().body(new Response("Asset movement has been updated"));
    }
    @Transactional
    @DeleteMapping(path = "delete/{id}")
    public ResponseEntity<Response> deleteAssetmovement(@PathVariable Long id){
        assetMovementService.deleteAssetMovement(id);
        return ResponseEntity.ok().body(new Response("Asset movement has been deleted"));
    }
    @GetMapping(path = "fetch/{id}")
    public ResponseEntity<?> getByid(@PathVariable Long id){
          return ResponseEntity.ok().body(assetMovementService.getByid(id));
    }
}
