package com.fams.fixedasset.assetmanagement.Activitylogs;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UseractivitiesRepository extends JpaRepository<Useractivities,Long> {
}
