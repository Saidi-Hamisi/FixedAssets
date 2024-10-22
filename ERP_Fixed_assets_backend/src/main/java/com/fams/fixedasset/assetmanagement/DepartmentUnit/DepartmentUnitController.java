package com.fams.fixedasset.assetmanagement.DepartmentUnit;

import com.fams.fixedasset.assetmanagement.Response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@CrossOrigin
@RestController
@RequestMapping(path = "api/departmentUnit")
public class DepartmentUnitController {

    @Autowired
    private DepartmentUnitService departmentUnitService;

    @PostMapping(path = "newDepartmentunit")
    public ResponseEntity<?> adddepartmentUnit(@RequestBody DepartmentUnit departmentUnit){
        departmentUnitService.addDepUnit(departmentUnit);
        return ResponseEntity.ok().body(new Response("New department Unit has been added."));
    }
    @GetMapping(path = "getDepartmentunits")
    public ResponseEntity<?> getdepartmentUnit(){
        return ResponseEntity.ok().body(departmentUnitService.getDepUnits());
    }
    @GetMapping(path = "getDepartmentunit/{id}")
    public ResponseEntity<?> getDepartmentunit(@PathVariable Long id){
        return ResponseEntity.ok().body(departmentUnitService.departmentUnit(id));
    }
    @PutMapping(path = "updateDepartmentunit")
    public ResponseEntity<?> updateDepartmentunit(@RequestBody DepartmentUnit departmentUnit){
        departmentUnitService.updateDepartmentUnit(departmentUnit);
        return ResponseEntity.ok().body(new Response("Department Unit updated successfully"));
    }

    @Transactional
    @DeleteMapping(path = "deleteDepartmentunit/{id}")
    public ResponseEntity<?> deleteDepartmentunit(@PathVariable Long id){
        departmentUnitService.deleteUnit(id);
        return ResponseEntity.ok().body(new Response("Department Unit deleted successfully"));
    }
}
