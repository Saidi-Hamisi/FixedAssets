/*
 * Copyright (c) 2022. Omukubwa Software Solutions (OSS)
 */

package com.fams.fixedasset.Authentication.repositories;

import com.fams.fixedasset.Authentication.payload.requests.sendmails.SendMails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface SendEmailsRepository extends JpaRepository<SendMails,Long> {
    //Update Status of an Email after sending
    @Transactional
    @Modifying
    @Query(nativeQuery = true,value = "UPDATE sentcredentials set status=?1 WHERE id=?2")
    void updateEmailStatus(@Param("status") String status, @Param("id") String id);

    //Return id of the email sent
    @Transactional
    @Query(nativeQuery = true,value = "SELECT id FROM sentcredentials WHERE timestamp =?1 and recipient =?2")
    String getEmailId(String timestamp, String recipient);
}
