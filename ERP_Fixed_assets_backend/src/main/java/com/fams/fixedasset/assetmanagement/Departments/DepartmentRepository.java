package com.fams.fixedasset.assetmanagement.Departments;

import com.fams.fixedasset.assetmanagement.Custodian.Custodian;
import com.fams.fixedasset.assetmanagement.DepartmentUnit.DepartmentUnit;
import com.fams.fixedasset.assetmanagement.Interfaces.AssetBydepartmentUnit;
import com.fams.fixedasset.assetmanagement.Interfaces.AssetsByDepartment;
import org.hibernate.mapping.Array;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Repository
public interface DepartmentRepository  extends JpaRepository<Department, Long> {
    @Query("SELECT d FROM Department d WHERE d.departmentName = ?1")
    Department findDepartmentByName(String departmentName);

    Department getDepartmentById(@PathVariable Long id);
    List<Department> findByDeletedFlag(Boolean deletedFlag);
    @Query(value = "select department_name  from department_unit where department =?1",nativeQuery = true)
    List<?> getDepunitByDepartments(@PathVariable String department);
    @Query(value = "select department_unit, count(*) as numberOfAssets,sum(cost) as value from assets group by department_unit",nativeQuery = true)
    List<AssetBydepartmentUnit> getAssetsBydepUnit();
    @Query(value = "select department_unit, count(*) as nuOfAssets,sum(cost) as value from assets where department_unit=?1",nativeQuery = true)
    List<AssetBydepartmentUnit> getassetBydepUnits(@PathVariable String departmentUnit);
    @Query(value = "select department.department_name as Department,count(*) as numberOfAssets,sum(assets.cost) as valueOfAssets from department join department_unit on department.id =department_unit.department_fk JOIN assets on department_unit.id =assets.department_unit_fk GROUP  BY department.department_name",nativeQuery = true)
    List<AssetsByDepartment> findAssetsBydepartment();
//@Query(value = "")

}
//  select department_unit, count(*),sum(cost) as value from assets;
//select department_unit, count(*),sum(cost) as value from assets where department_unit="Human resource"