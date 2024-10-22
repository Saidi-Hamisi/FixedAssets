package com.fams.fixedasset.assetmanagement.Activitylogs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(path = "api/logs")
public class UserActivitiesController {
    @Autowired
    private UseractivittyService useractivittyService;

    @PostMapping(path = "new")
    public void newlog(@RequestBody Useractivities useractivities){
        useractivittyService.newActivity(useractivities);

    }
    @GetMapping(path = "logs")
    public ResponseEntity<?> getlogs(){
        return ResponseEntity.ok().body(useractivittyService.getActivities());
    }
}
