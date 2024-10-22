package com.fams.fixedasset.assetmanagement.Email;

import com.fams.fixedasset.assetmanagement.Utils.Configurations;
import com.sun.mail.util.MailSSLSocketFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.security.GeneralSecurityException;
import java.util.Properties;

@Slf4j
@Service
public class Sender {
    Configurations conf= new Configurations();
    String mailFrom = conf.getProperties().getProperty("senderEmail");
    String password = conf.getProperties().getProperty("password");
    String mailto = conf.getProperties().getProperty("recipientMail");


    public void sender(String subject,String msg){

//        String mailto = "ibrahimkiprotich81@gmail.com";
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);
        mailSender.setUsername(mailFrom);
        mailSender.setPassword(password);

        Properties properties = new Properties();
        properties.setProperty("mail.smtp.auth", "true");
        properties.setProperty("mail.smtp.starttls.enable", "true");
        properties.setProperty("mail.smtp.ssl.trust", "smtp.gmail.com");

        mailSender.setJavaMailProperties(properties);

       SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(mailFrom);
        message.setTo(mailto);
        message.setSubject(subject);
        message.setText(msg);

        mailSender.send(message);
        log.info("Email sent successfully");

    }
    public  void emailsender(String mailto,String subject,String messagebody) throws GeneralSecurityException {
        // Mention the Recipient's email address
//        String to = "ibrahimkiprotich81@gmail.com";

        // Mention the Sender's email address
        String from = mailFrom;

        // Mention the SMTP server address. Below Gmail's SMTP server is being used to send email
        String host = "smtp.gmail.com";

        MailSSLSocketFactory sf = new MailSSLSocketFactory();
        sf.setTrustAllHosts(true);
        // or
        // sf.setTrustedHosts(new String[] { "my-server" });

        // Get system properties
        Properties properties = System.getProperties();

        // Setup mail server
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", "587");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.ssl.socketFactory", sf);
        // Get the Session object.// and pass username and password
        Session session = Session.getInstance(properties, new javax.mail.Authenticator() {

            protected PasswordAuthentication getPasswordAuthentication() {

                return new PasswordAuthentication(mailFrom, password);

            }

        });

        // Used to debug SMTP issues
        session.setDebug(true);

        try {
            // Create a default MimeMessage object.
            MimeMessage message = new MimeMessage(session);

            // Set From: header field of the header.
            message.setFrom(new InternetAddress(from));

            // Set To: header field of the header.
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(mailto));

            // Set Subject: header field
            message.setSubject(subject);

            // Now set the actual message
            message.setText(messagebody);

            // Send message
            Transport.send(message);
            log.info("Email sent successfully....");
        } catch (MessagingException mex) {
            mex.printStackTrace();
            log.error(String.valueOf(mex));
        }

    }
}
