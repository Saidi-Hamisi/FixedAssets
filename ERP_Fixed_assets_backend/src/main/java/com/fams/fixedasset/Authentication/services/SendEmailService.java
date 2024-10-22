/*
 * Copyright (c) 2022. Omukubwa Software Solutions (OSS)
 */

package com.fams.fixedasset.Authentication.services;

import com.fams.fixedasset.Authentication.exceptions.ApiRequestException;
import com.fams.fixedasset.Authentication.payload.requests.sendmails.SendMails;
import com.fams.fixedasset.Authentication.repositories.ResetPasswordRepository;
import com.fams.fixedasset.Authentication.repositories.SendEmailsRepository;
import com.fams.fixedasset.Authentication.utilities.SendCredentialToMail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;

@Service
public class SendEmailService {

    @Autowired
    private SendEmailsRepository repository;

    @Autowired
    private ResetPasswordRepository passwordRepository;

    //Instance of single email class
    SendCredentialToMail ssm = new SendCredentialToMail();

    //Save Details of an email body before sending
    public SendMails sendNewEmail(SendMails emailbody,String username,String password) throws MessagingException, IOException {
        //Inputs Validation and handling of null values
        if(emailbody.getRecipient().equalsIgnoreCase(""))
        {
            throw new ApiRequestException("Recipient Email Email Address Must be Specified!");
        }

        //Time Stamp
        String timestamp = new SimpleDateFormat("dd/MM/YYYY :: HHmmss").format(Calendar.getInstance().getTime());
        emailbody.setTimestamp(timestamp);

        //Status
        emailbody.setStatus("N");

        //Save Details of Email Body Before Sending email
        repository.save(emailbody);

        //Send Email
        String recipient = emailbody.getRecipient();

        ssm.sendOneMail(recipient,username,password);

        //Email Status
        String status = "Sent";
        String id  = repository.getEmailId(timestamp,recipient);

        //Update Status of an Email
        updateEmailStatus(status,id);

        return emailbody;
    }

    //Send Password token and link to user email
    public void sendTokenAndURL(String emailaddress,int token) throws MessagingException, IOException {
        ssm.sendPassWordReset(emailaddress,token);
    }

    //Update Status of an Email
    public void updateEmailStatus(String status,String id)
    {
        repository.updateEmailStatus(status,id);
    }
}
