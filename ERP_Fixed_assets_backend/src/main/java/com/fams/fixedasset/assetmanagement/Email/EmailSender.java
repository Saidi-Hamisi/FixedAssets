package com.fams.fixedasset.assetmanagement.Email;


import com.fams.fixedasset.assetmanagement.Utils.Configurations;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.*;
import java.io.IOException;
import java.util.Date;
import java.util.Properties;
import java.util.logging.FileHandler;
import java.util.logging.SimpleFormatter;

@Slf4j
@Service
public class EmailSender {



    Configurations conf = new Configurations();
    private  String path = conf.getProperties().getProperty("reportpath");
    private String logging_path= conf.getProperties().getProperty("logging_path");
    String sendermail = conf.getProperties().getProperty("sendermail");
    String password = conf.getProperties().getProperty("password");
    String recipients = conf.getProperties().getProperty("recipients");
    String ccList = conf.getProperties().getProperty("CC_mails");
    String bccList= conf.getProperties().getProperty("BCC_emails");
    String type= conf.getProperties().getProperty("type");
    String smtpAuth = conf.getProperties().getProperty("mailsmatpAuth");
    String startlsEnable = conf.getProperties().getProperty("startlsEnable");
    String smtphost = conf.getProperties().getProperty("smtphost");
    String hosttype = conf.getProperties().getProperty("hosttype");
    String smtpport = conf.getProperties().getProperty("smtpport");
    String portnumber = conf.getProperties().getProperty("portnumber");

    String all = conf.getProperties().getProperty("all");


    InternetAddress[] CCparse = InternetAddress.parse(ccList , true);
    InternetAddress[] BCCparse = InternetAddress.parse(bccList , true);


    String[] emailRecipients = recipients.split(",");
    String[] ccMailList = ccList.split(",");


//
//    //LOGGING
//    Logger emaillogger = Logger.getLogger(String.valueOf(EmailSender.class));
//    FileHandler fh;

    public EmailSender() throws AddressException {
    }


   ;

 public  void sendStatements(String subject,String messagebody) throws MessagingException {
        Properties props = new Properties();
//        props.put(smtpAuth,"true");
//        props.put(startlsEnable, "true");
//        props.put(smtphost, hosttype);
//        props.put(smtpport, portnumber);
        props.put("mail.smtp.auth", true);
        props.put("mail.smtp.starttls.enable", true);
        props.put("mail.smtp.ssl.trust", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");


        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(sendermail, password);
            }});

        for(int i=0;i<emailRecipients.length;i++) {
//                System.out.println(emailRecipients[i]);
            if (type.equalsIgnoreCase("cc")) {
                ccMailList = ccList.split(",");
            }
            else if(type.equalsIgnoreCase("bcc")) {
                ccMailList = bccList.split(",");
            }
//
            Message msg = new MimeMessage(session);
            msg.setFrom(new InternetAddress(sendermail, false));
            msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(emailRecipients[i]));
//                        msg.addRecipient(Message.RecipientType.BCC,new InternetAddress("gwmdbatpilpqmlddiu@pp7rvv.com"));
            if (type.equalsIgnoreCase("cc")) {
                msg.setRecipients(Message.RecipientType.CC,CCparse);
//                            msg.addRecipient(Message.RecipientType.CC, new InternetAddress(ccMailList[j]));
//                            msg.setRecipients(Message.RecipientType.CC, new Address[] ccMailList);
            }
            else if(type.equalsIgnoreCase("bcc")) {
//                            msg.addRecipient(Message.RecipientType.BCC, new InternetAddress(ccMailList[j]));
//                            msg.addRecipient(Message.RecipientType.BCC, new InternetAddress());
                msg.setRecipients(Message.RecipientType.BCC,BCCparse);

            }

            msg.setSubject(subject);
            msg.setSentDate(new Date());
            MimeBodyPart messageBodyPart = new MimeBodyPart();
            messageBodyPart.setContent(messagebody,"text/html");
//            Multipart multipart = new MimeMultipart();
//            multipart.addBodyPart(messageBodyPart);
//            MimeBodyPart attachPart = new MimeBodyPart();
//
//            multipart.addBodyPart(attachPart)
            //msg.setContent(multipart);
//            Transport.send();
            Transport.send(msg);
//            log.info("Email sent successfully");


        }

    }

}