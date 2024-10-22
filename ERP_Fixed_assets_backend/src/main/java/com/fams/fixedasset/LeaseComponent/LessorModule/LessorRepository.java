package com.fams.fixedasset.LeaseComponent.LessorModule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LessorRepository extends JpaRepository<Lessor, Long> {
    Optional<Lessor> findLessorById(Long id);

    Optional<Lessor> findLessorByLessorCode(String lessorCode);

    Optional<Lessor> findLessorByLessorKraPin(String lessorKraPin);
    Optional<Lessor> findLessorByRegDocNo(String regDocNo);
    List<Lessor> findAllByDeletedFlagOrderByIdDesc(Character deletedFlag);
    List<Lessor> findAllByDeletedFlagAndVerifiedFlagOrderByIdDesc(Character deletedFlag, Character verifiedFlag);


    @Query(value = "SELECT `id` AS Id, `lessor_code` AS LessorCode FROM lessor ORDER BY `lessor_code` DESC LIMIT 1", nativeQuery = true)
    Optional<getLessorData> findLessors();
    public interface getLessorData {
        Long getId();
        String getLessorCode();
    }

    @Query(value = "SELECT `id` AS Id, reg_doc_no AS regDocNo, reg_doc_image AS regDocImage FROM lessor WHERE id=:id", nativeQuery = true)
    Optional<getLessorDoc> findLessorDoc(Long id);
    public interface getLessorDoc {
        Long getId();
        String getRegDocNo();
        String getRegDocImage();
    }

}
