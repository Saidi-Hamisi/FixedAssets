package com.fams.fixedasset.assetmanagement.Location;


import com.fams.fixedasset.assetmanagement.Response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(path = "api/location")
public class LocationController {


    @Autowired
    private  LocationService locationService;

    @PostMapping(path = "addLocation")
    public ResponseEntity<?> newLocation(@RequestBody Location location){
        locationService.newLocation(location);
        return  ResponseEntity.ok().body(new Response("new Location added successfully"));
    }
    @GetMapping(path = "locations")
    public ResponseEntity<?> fetchLocations(){
        return ResponseEntity.ok().body(locationService.getLocations());
    }
    @PutMapping(path = "updateLocation")
    public ResponseEntity<?>  updateLocation(@RequestBody Location location){
        locationService.updateLocation(location);
        return  ResponseEntity.ok().body(new Response("Location updated successfully"));
    }
    @GetMapping(path = "location/{id}")
    public ResponseEntity<?> getLocationByid(@PathVariable Long id){
        return ResponseEntity.ok().body(locationService.getLocationByid(id));
    }
    @DeleteMapping(path = "delete/{id}")
    public ResponseEntity<?> deleteLocation(@PathVariable Long id){
        locationService.deleteLocation(id);
        return ResponseEntity.ok().body(new Response("Location deleted successfully"));
    }

    @GetMapping(path = "ward/assets")
    public ResponseEntity<?> getAssetByward(){
        return  ResponseEntity.ok().body(locationService.assetbyLocations());
    }
    @GetMapping(path = "subcounty/assets")
    public ResponseEntity<?> getAssetBySubcounty(){
        return  ResponseEntity.ok().body(locationService.findAssetsBylocation());
    }

}
