package com.fams.fixedasset.assetmanagement.Departments;


import com.fams.fixedasset.assetmanagement.DepartmentUnit.DepartmentUnit;
import com.fams.fixedasset.assetmanagement.Interfaces.AssetBydepartmentUnit;
import com.fams.fixedasset.assetmanagement.Interfaces.AssetsByDepartment;
import com.fams.fixedasset.assetmanagement.asset.Assetrepository;
import com.fams.fixedasset.assetmanagement.codegenerator.Codegenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class DepartmentService {
    @Autowired
    private DepartmentRepository departmentRepository;
    @Autowired
    private Assetrepository assetrepository;

    public Department addDepartment(Department department){
        String departmentstring = department.getDepartmentName();
    System.out.println("Department" + departmentstring);

        Character char1= departmentstring.charAt(0);
        Character char2= departmentstring.charAt(1);
        Character char3= departmentstring.charAt(2);
        String depCode = new StringBuilder().append(char1).append(char2).append(char3).toString().toUpperCase();
        Codegenerator codegenerator = new Codegenerator();
        String randomeString = codegenerator.randomString();

        String finalcode = String.join("/",depCode,randomeString);
        System.out.println("Department code is " + finalcode);

        department.setDepartmentCode(finalcode);
    System.out.println("Department code is " + department.getDepartmentCode());
        department.setDeletedFlag(false);
        return  departmentRepository.save(department);
    }

   public List<Department> getDepartments(){
       return departmentRepository.findByDeletedFlag(false);

   }
    public Department getDepartmentById(Long id){
        return departmentRepository.getDepartmentById(id);

    }
    public Department getdepByName(String departmentName){
        Department department= departmentRepository.findDepartmentByName(departmentName);

        if (department!=null){
            throw  new IllegalStateException("Department  with name  " + departmentName + " does  not exist");
        }
        return departmentRepository.findDepartmentByName(departmentName);
    }

    public Department updateDepartment(Department department) {
        department.setDeletedFlag(false);
        return departmentRepository.save(department);
    }

    public  void deleteDepartment(Long id){
        Department department = departmentRepository.getById(id);
        department.setDeletedFlag(true);
        departmentRepository.save(department);
//        departmentRepository.deleteById(id);
    }

    public  List<?> getAssetsBydepartment(){
        List<Department> departments = departmentRepository.findAll();

        for (Department  department: departments ) {

//         System.out.println("Depatyment units in" + department.getDepartmentName() + " :: " + departmentRepository.getDepunitByDepartments(department.getDepartmentName()) );
        List<?> deparUnits = departmentRepository.getDepunitByDepartments(department.getDepartmentName());
        for (Object depunit :deparUnits ) {
//           List<AssetBydepartmentUnit> results = departmentRepository.getassetBydepUnits((String) depunit);
        System.out.println("!!!!!!!!!!!!!!!!" + departmentRepository.getassetBydepUnits((String) depunit));
//            Arrays[] arrays= new Arrays[results.size()];
//        System.out.println("Results " + results);
        System.out.println("*************************************");
        }

      System.out.println("Depatyment units in" + department.getDepartmentName() + " :: " + deparUnits );
      System.out.println("#################################");
      System.out.println();
        }
        return null;
    }

    public List<AssetBydepartmentUnit> assetBydepartmentUnits(){
        return departmentRepository.getAssetsBydepUnit();
    }

    public  List<AssetsByDepartment> findAssetsBydepartment(){
        return  departmentRepository.findAssetsBydepartment();
    }

}

