package com.springreact.service.services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendPasswordRecoverEmail(String from, String receiver, String link) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
    
        message.setFrom(new InternetAddress(from));
        message.setRecipients(MimeMessage.RecipientType.TO, receiver);
        message.setSubject("Password Recover");
    
        StringBuilder sb = new StringBuilder();
        sb.append("<h1 style=\"text-align: center;\">Recover Your Password</h1>\n");
        sb.append("<p style=\"text-align: center;\">In the following link you can update your password</p>\n");
        sb.append("<p style=\"text-align: center;\"><a href=\"" + link + "\">Click Here To Follow The Link</a></p>\n");
        String htmlContent = sb.toString();
        message.setContent(htmlContent, "text/html; charset=utf-8");
    
        mailSender.send(message);
    }
    
}
