package com.fams.fixedasset.Authentication.utilities;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.io.IOException;
import java.util.Date;
import java.util.Properties;

public class SendCredentialToMail {
    //Instance of the configuration class
    static Configurations c = new Configurations();
    static String host = c.getProperties().getProperty("fams.email.host");
    static String port = c.getProperties().getProperty("fams.email.port");
    static String password = c.getProperties().getProperty("fams.email.password");
    static String subject = c.getProperties().getProperty("fams.email.subject");
    static String subject1 = c.getProperties().getProperty("fams.email.subject1");
    static String sender = c.getProperties().getProperty("fams.email.sender");
    static String greetings = c.getProperties().getProperty("fams.email.greetings");
    static String signoff = c.getProperties().getProperty("fams.email.signoff");
    static String body1 = c.getProperties().getProperty("fams.email.body1");
    static String body2 = c.getProperties().getProperty("fams.email.body2");
    static String body3 = c.getProperties().getProperty("fams.email.body3");
    static String body4 = c.getProperties().getProperty("fams.email.body4");
    static String body5 = c.getProperties().getProperty("fams.email.body5");
    static String body6 = c.getProperties().getProperty("fams.email.body6");
    static String reseturl = c.getProperties().getProperty("fams.token.url");


    public void sendOneMail(String recipient,String uname,String pass) throws MessagingException, IOException {
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.port", port);

        Session session = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(sender, password);
            }});

        //Sending emails ...
        Message msg = new MimeMessage(session);
        msg.setFrom(new InternetAddress(sender, false));
        msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipient));
        msg.setSubject(subject);
        msg.setSentDate(new Date());
        Multipart mp = new MimeMultipart();
        MimeBodyPart htmlPart = new MimeBodyPart();
        htmlPart.setContent(greetings+body1+uname+body2+pass+signoff, "text/html; charset=utf-8");
        mp.addBodyPart(htmlPart);
        msg.setContent(mp);
        Transport.send(msg);
        System.out.println("Mail Sent successfully to :\n"+recipient);
    }


    //Send Password reset details
    public void sendPassWordReset(String recipient,int token) throws MessagingException, IOException {
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.port", port);

        Session session = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(sender, password);
            }});

        //Sending emails ...
        Message msg = new MimeMessage(session);
        msg.setFrom(new InternetAddress(sender, false));
        msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipient));
        msg.setSubject(subject1);
        msg.setSentDate(new Date());
        Multipart mp = new MimeMultipart();
        MimeBodyPart htmlPart = new MimeBodyPart();
        htmlPart.setContent(greetings+body3+token+body4+reseturl+body5+reseturl+body6+signoff, "text/html; charset=utf-8");
        mp.addBodyPart(htmlPart);
        msg.setContent(mp);
        Transport.send(msg);
        System.out.println("Mail Sent successfully to :\n"+recipient);
    }

}
