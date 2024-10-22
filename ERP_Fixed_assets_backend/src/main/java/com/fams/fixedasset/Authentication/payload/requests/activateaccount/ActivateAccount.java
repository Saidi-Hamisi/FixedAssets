package com.fams.fixedasset.Authentication.payload.requests.activateaccount;

public class ActivateAccount {

    private String username;
    private boolean status;

    public ActivateAccount(String username, boolean status) {
        this.username = username;
        this.status = status;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}

