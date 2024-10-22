package com.fams.fixedasset.assetmanagement.Depreciation;


import com.fams.fixedasset.assetmanagement.Response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "api/depreciation")
public class DepreciationController {


    private final DepreciationEntityRepository depreciationRepository;

    @Autowired
    public DepreciationController(DepreciationEntityRepository depreciationRepository) {
        this.depreciationRepository = depreciationRepository;
    }

    @Autowired
    private DepreciationService depreciationService;


    @PostMapping(path = "addDepreciation")
    public ResponseEntity<?> newDepreciationMethod(@RequestBody DepreciationMethods depreciation) {
        depreciationService.addDepreciationMethod(depreciation);
        return ResponseEntity.ok().body(new Response("Depreciation added successfully"));
    }


    @GetMapping(path = "getDepreciationMethods")
    public ResponseEntity<?> getDepreciationMethod() {
        return ResponseEntity.ok().body(depreciationService.fetchDepreciationMethods());
    }

    //    @GetMapping(path = "")
//    produces = "application/json"
    @GetMapping(path = "{method}/{c}/{sv}/{y}/{rate}/{assetId}")
    public ResponseEntity<?> doDepreciation(@PathVariable String method, @PathVariable Double c, @PathVariable Double sv, @PathVariable Long y, @PathVariable Float rate, @PathVariable String assetId) {
        return ResponseEntity.ok().body(depreciationService.depreciation(method, c, sv, y, rate, assetId));
    }


    @GetMapping("/all")
    public List<Depreciation> getAllDepreciation() {
        return depreciationRepository.findAll();
    }

//    @GetMapping("/asset/{assetId}")
//    public List<Depreciation> getDepreciationByAssetId(@PathVariable String assetId) {
//        return depreciationRepository.findAllByAssetId(assetId);
//    }

    @GetMapping("/asset/{assetId}")
    public ResponseEntity<?> getDepreciationByAssetId(@PathVariable String assetId) {
        List<Depreciation> depreciationList = depreciationRepository.findAllByAssetId(assetId);
        if (depreciationList.isEmpty()) {
            String errorMessage = "Asset depreciation details do not exist for asset ID: " + assetId;
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
        }
        return ResponseEntity.ok(depreciationList);
    }


}
