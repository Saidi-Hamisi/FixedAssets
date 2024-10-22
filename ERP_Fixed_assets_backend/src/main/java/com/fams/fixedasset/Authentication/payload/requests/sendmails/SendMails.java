/*
 * Copyright (c) 2022. Omukubwa Software Solutions (OSS)
 */

package com.fams.fixedasset.Authentication.payload.requests.sendmails;

import javax.persistence.*;

@Entity
@Table(name = "sentcredentials")
public class SendMails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable =false,updatable=false)
    private Long id;
    @Column(nullable = false)
    private String recipient;
    @Column(nullable = false)
    private String username;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private String timestamp;

    public SendMails() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRecipient() {
        return recipient;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Column(nullable = false)
    private String status;

    public SendMails(String recipient, String username, String password, String timestamp, String status) {
        this.recipient = recipient;
        this.username = username;
        this.password = password;
        this.timestamp = timestamp;
        this.status = status;
    }
}
