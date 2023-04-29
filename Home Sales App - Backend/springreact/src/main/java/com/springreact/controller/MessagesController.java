package com.springreact.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.springreact.model.Messages;
import com.springreact.model.Property;
import com.springreact.model.User;
import com.springreact.service.interfaces.IMessageService;
import com.springreact.service.interfaces.IPropertyService;
import com.springreact.service.interfaces.IUserService;

import jakarta.servlet.http.HttpServletRequest;


@Controller
@RequestMapping("/api/messages")
public class MessagesController {

    @Autowired
    private IUserService userService;

    @Autowired
    private IMessageService messageService;

    @Autowired
    private IPropertyService propertyService;
    
    @PostMapping("/save-new-message")
    public ResponseEntity<String> saveNewMessage(@RequestBody HashMap<String, String> data){

        try {
            
            String receiver_id = data.get("receiverId");
            String senderUsername = data.get("senderUsername");
            String propertyIdStr = data.get("propertyId");
            String message = data.get("message");
            
            // Changing the datatype
            Integer receiverId = Integer.parseInt(receiver_id);
            Integer propertyId = Integer.parseInt(propertyIdStr);
    
            // Finding the users
            User receiver = userService.getUserById(receiverId);
            User sender = userService.getUserByUsername(senderUsername);
    
            // Creating the message
            Messages newMessage = new Messages();
            newMessage.setSender(sender);
            newMessage.setReceiver(receiver);
            newMessage.setMessage(message);

            // finding the property
            Property property = propertyService.getPropertyById(propertyId);
            newMessage.setProperty(property);
    
            // Validate how many messages have been sent for the property
            Integer messagesSent = messageService.getMessagesBySenderAndProperty(sender, property);

            if (messagesSent < 4) {
                messageService.saveMessage(newMessage);
        
                return ResponseEntity.ok().body("Message Saved");
            }else{
                return ResponseEntity.badRequest().body("The limit of 4 messages sent to this person has been reached. Wait for the user to contact you.");
            }

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/get-messages")
    public ResponseEntity<HashMap<String, Object>> showMessagesByUser(HttpServletRequest request, Pageable pageable){

        HashMap<String, Object> responseData = new HashMap<String, Object>();

        try {

            String Username = request.getHeader("username");
            User user = userService.getUserByUsername(Username);
            Page<Messages> userMessages = messageService.getmessagesByReceiver(user, pageable);

            responseData.put("data", userMessages);
            return ResponseEntity.ok().body(responseData);

        } catch (Exception e) {
            responseData.put("msg", e.getMessage());

            return ResponseEntity.internalServerError().body(responseData);
        }


    }

    @GetMapping("/get-number-messages")
    public ResponseEntity<HashMap<String, Object>> showNumberOfMessages(HttpServletRequest request){

        HashMap<String, Object> responsedata = new HashMap<String, Object>();

        try {
            String username = request.getHeader("username");
            System.out.println(username);
            Integer numberOfMessages = messageService.getNumberOfMessagesByusername(username);
            responsedata.put("messagesNumber", numberOfMessages);
            return ResponseEntity.ok().body(responsedata);
        } catch (Exception e) {
            responsedata.put("msg", e.getMessage());
            return ResponseEntity.badRequest().body(responsedata);
        }
    }

    @DeleteMapping("/delete-message")
    public ResponseEntity<HashMap<String, Object>> deleteMessage(HttpServletRequest request){

        HashMap<String, Object> result = new HashMap<String, Object>();

        // Verify the message exists
        Messages message = messageService.getMessageById(Integer.parseInt(request.getHeader("messageId")));

        if(message == null){
            result.put("ok", false);
            result.put("msg", "This message does not exist");
            return ResponseEntity.badRequest().body(result);
        }

        // Verify the receiver.id = user.id who is trying to remove message
        User user = userService.getUserByUsername(request.getHeader("username"));
        if (message.getReceiver().getId() != user.getId()) {
            result.put("ok", false);
            result.put("msg", "You do not have permissions to remove this message");
            return ResponseEntity.badRequest().body(result);
        } 

        // Remove the message
        messageService.removeMessage(message);

        result.put("ok", true);
        result.put("msg", "The message has been removed successfully");
        return ResponseEntity.ok().body(result);

    }

}
