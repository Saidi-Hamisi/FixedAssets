package com.fams.fixedasset.assetmanagement.DepartmentUnit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

@Repository
public interface DepartmentUnitRepository extends JpaRepository<DepartmentUnit, DepartmentUnit> {
    DepartmentUnit getUnitById(@PathVariable Long id);
    DepartmentUnit getDepUnitByDepartmentName(@PathVariable String departmentName);

    void deleteById(Long id);
}
