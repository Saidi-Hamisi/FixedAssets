package com.fams.fixedasset.assetmanagement.codegenerator;
import com.fams.fixedasset.assetmanagement.Response.Response;
import org.json.JSONObject;
import com.fams.fixedasset.assetmanagement.asset.Asset;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Random;
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class CodeGen {
    @Autowired
    private  ParameterRepo repo;

    @Autowired
    private  ParameterService parameterService;

    @PostMapping(path = "configuration")
    public ResponseEntity<?> new_params(@RequestBody Parameters parameters){
        parameterService.newParameters(parameters);
        return ResponseEntity.ok().body(new Response("New Confuguration set"));
    }
    @GetMapping(path = "params")
    public ResponseEntity<?> params(){
        return ResponseEntity.ok().body(parameterService.params());
    }
    @GetMapping(path = "parameters")
    public ResponseEntity<?> parameters(){
        return ResponseEntity.ok().body(parameterService.getparams());
    }



}
