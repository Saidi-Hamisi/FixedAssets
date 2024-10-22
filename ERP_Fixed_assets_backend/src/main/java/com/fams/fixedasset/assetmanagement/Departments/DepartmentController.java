package com.fams.fixedasset.assetmanagement.Departments;


import com.fams.fixedasset.assetmanagement.Response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(path = "api/departments")
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    @PostMapping(path = "newDepartment")
    public ResponseEntity<?> addDepartment(@RequestBody Department department){
        departmentService.addDepartment(department);
        return ResponseEntity.ok().body(new Response("new Department added successfully"));
    }
    @GetMapping(path = "fetchDepartments")
    public ResponseEntity<?> getDepartments(){
            return ResponseEntity.ok().body(departmentService.getDepartments());
    }
    @GetMapping(path = "departments/{depName}")
    public ResponseEntity<?> getDepbyName(@PathVariable String depName){
        return  ResponseEntity.ok().body(departmentService.getdepByName(depName));


    }

    @PutMapping(path = "updateDepartment")
    public ResponseEntity<?> updateDepartment(@RequestBody Department department){
        departmentService.updateDepartment(department);
        return ResponseEntity.ok().body(new Response("Department updated successfully"));
    }
    @DeleteMapping(path = "delete/{id}")
    public ResponseEntity<?> deleteDepartment(@PathVariable Long id){
        departmentService.deleteDepartment(id);
        return  ResponseEntity.ok().body(new Response("Department deleted successfully"));
    }

//    @GetMapping(path = "assets")
//    public ResponseEntity<?> getAssetsByDepartment(){
//        return  ResponseEntity.ok().body(departmentService.getAssetsBydepartment());
//    }

    @GetMapping(path = "departmentunits/assets")
    public  ResponseEntity<?> assetBydepartmentUnits(){
        return ResponseEntity.ok().body(departmentService.assetBydepartmentUnits());
    }
    @GetMapping(path = "assets")
    public  ResponseEntity<?> getassetbydepartment(){
        return ResponseEntity.ok().body(departmentService.findAssetsBydepartment());
    }

}
