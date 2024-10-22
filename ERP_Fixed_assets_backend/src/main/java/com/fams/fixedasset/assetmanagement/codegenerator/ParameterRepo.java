package com.fams.fixedasset.assetmanagement.codegenerator;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ParameterRepo  extends JpaRepository<Parameters,Long> {
    @Transactional
        @Query(nativeQuery = true,value = "SELECT parameter FROM parameters order by id asc")
    List<String> parameters();
}
