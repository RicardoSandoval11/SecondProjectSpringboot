package com.springreact.service.interfaces;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.springreact.model.Messages;
import com.springreact.model.Property;
import com.springreact.model.User;

public interface IMessageService {
    
    void saveMessage(Messages message);
    Integer getMessagesBySenderAndProperty(User sender, Property property);
    Page<Messages> getmessagesByReceiver(User receiverId, Pageable pageable);
    Integer getNumberOfMessagesByusername(String receiverUsername);
    Messages getMessageById(Integer messageId);
    void removeMessage(Messages messages);
}
