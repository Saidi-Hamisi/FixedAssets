package com.fams.fixedasset.LeaseComponent.LeaseModule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LeaseRepo extends JpaRepository<Lease, Long> {
    Optional<Lease> findByIdAndDeletedFlag(Long aLong, Character deletedFlag);
    List<Lease> findByDeletedFlag(Character deletedFlag);
}
