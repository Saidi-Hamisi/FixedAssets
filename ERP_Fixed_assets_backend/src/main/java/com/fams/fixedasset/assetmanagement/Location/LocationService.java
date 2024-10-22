package com.fams.fixedasset.assetmanagement.Location;

import com.fams.fixedasset.assetmanagement.Interfaces.AssetbyLocation;
import com.fams.fixedasset.assetmanagement.Interfaces.AssetsByLocation;
import com.fams.fixedasset.assetmanagement.codegenerator.Codegenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;

    public LocationService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    public Location newLocation(Location location) {
        System.out.println("New location is " + location.getSubcounty());
        String subcounty = location.getSubcounty();
        String ward = location.getWard();
//        System.out.println("codeString is " + Arrays.toString(splitToNChar(codestring,3)).toUpperCase());


        Codegenerator codegenerator = new Codegenerator();
        String syscode = codegenerator.gererate(subcounty, ward);
        String randomString = codegenerator.randomString();

        String finalcode = String.join("/", syscode, randomString);
        System.out.println("Final Location code is :: " + finalcode);


        location.setLocationCode(finalcode);
        location.setDeleteFlag(false);
        return locationRepository.save(location);
    }


    private static String[] splitToNChar(String text, int size) {
        List<String> parts = new ArrayList<>();

        int length = text.length();
        for (int i = 0; i < length; i += size) {
            parts.add(text.substring(i, Math.min(length, i + size)));
        }
        return parts.toArray(new String[0]);
    }

    public Location updateLocation(Location location) {
        location.setDeleteFlag(false);
        return locationRepository.save(location);
    }

    public List<Location> getLocations() {
        return locationRepository.findByDeleteFlag(false);
    }

    public Location getLocationByid(Long id) {
        return locationRepository.getLocationByid(id);
    }

    public void deleteLocation(Long id) {
        Location location = locationRepository.getLocationByid(id);
        location.setDeleteFlag(true);
//        locationRepository.deleteById(id);
        locationRepository.save(location);
    }

    public List<AssetbyLocation> assetbyLocations() {
        return locationRepository.getAssetsBylocation();
    }

    public List<AssetsByLocation> findAssetsBylocation() {
        return locationRepository.findAssetsBylocation();
    }
}
