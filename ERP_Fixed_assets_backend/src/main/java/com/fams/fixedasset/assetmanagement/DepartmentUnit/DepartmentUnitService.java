package com.fams.fixedasset.assetmanagement.DepartmentUnit;

import com.fams.fixedasset.assetmanagement.Departments.Department;
import com.fams.fixedasset.assetmanagement.Departments.DepartmentService;
import com.fams.fixedasset.assetmanagement.codegenerator.Codegenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentUnitService {

    @Autowired
    private DepartmentUnitRepository departmentUnitRepository;
    @Autowired
    private DepartmentService departmentService;

    public  DepartmentUnit addDepUnit(DepartmentUnit departmentUnit){
        Codegenerator codegenerator= new Codegenerator();
        Long department_ID = departmentUnit.getDepartment_fk();
    System.out.println("Department foreign key is ::" + department_ID);
        Department department = departmentService.getDepartmentById(department_ID);
        System.out.println("Department foreign key is ::" + department);
        String department_Name = department.getDepartmentName();
        String department_unit = departmentUnit.getDepartmentName();
        String randomString = codegenerator.randomString();
      String syscode =   codegenerator.gererate(department_Name,department_unit);

        String final_code = String.join("/", syscode,randomString);
        System.out.println("System generated code is " + final_code);
        departmentUnit.setDepartmentCode(final_code);
        System.out.println("System generated code is ::" + departmentUnit.getDepartmentCode());
        return departmentUnitRepository.save(departmentUnit);
    }
    public List<DepartmentUnit> getDepUnits(){
        return departmentUnitRepository.findAll();
    }
    public  DepartmentUnit updateDepartmentUnit(DepartmentUnit departmentUnit){
        return departmentUnitRepository.save(departmentUnit);
    }
    public DepartmentUnit departmentUnit(Long id){
        return departmentUnitRepository.getUnitById(id);
    }
    public void deleteUnit(Long id){
        departmentUnitRepository.deleteById(id);
    }



}
