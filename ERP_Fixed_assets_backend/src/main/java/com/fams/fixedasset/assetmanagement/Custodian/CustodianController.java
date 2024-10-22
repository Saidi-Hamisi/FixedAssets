package com.fams.fixedasset.assetmanagement.Custodian;


import com.fams.fixedasset.assetmanagement.Response.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@CrossOrigin
@RestController
@RequestMapping(path = "api/custodian")
public class CustodianController {

    @Autowired
    private CustodianService custodianService;
    @PostMapping(path = "new_custodian")
    public ResponseEntity<?> newCustodian(@RequestBody Custodian custodian){
        custodianService.addCustodian(custodian);
        return ResponseEntity.ok().body(new Response("New custodian added successfully"));
    }

    @GetMapping(path = "getCustodians")
    public ResponseEntity<?> fetchCustodians(){
        return ResponseEntity.ok().body(custodianService.getcustodians());
    }
    @GetMapping(path = "custodian/{id}")
    public  ResponseEntity<?> getSingleCustodian(@PathVariable Long id){
        return ResponseEntity.ok().body(custodianService.getCustodianByid(id));
    }
    @PutMapping(path = "updateCustodian")
    public ResponseEntity<?> updateCustodian(@RequestBody Custodian custodian){
        custodianService.updateCustodian(custodian);
        return ResponseEntity.ok().body(new Response("New custodian updated successfully"));
    }

    @DeleteMapping(path = "deleteCustodian/{id}")
    public  ResponseEntity<?> deleteCustodian(@PathVariable Long id){
        custodianService.deleteCustodian(id);
        return ResponseEntity.ok().body(new Response("Custodian deleted successfully"));
    }


}
