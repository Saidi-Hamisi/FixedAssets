package com.fams.fixedasset.LeaseComponent.LeaseModule.LeaseArmotizationSchedule.LeaseSchedule;

import com.fams.fixedasset.LeaseComponent.LeaseModule.Lease;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LeaseScheduleRepo extends JpaRepository<LeaseArmotizationSchedule,Long> {
    Optional<LeaseArmotizationSchedule> findByPeriodAndLease(Integer id, Lease lease);
}
