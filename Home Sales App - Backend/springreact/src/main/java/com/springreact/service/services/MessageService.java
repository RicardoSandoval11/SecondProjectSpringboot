package com.springreact.service.services;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.springreact.model.Messages;
import com.springreact.model.Property;
import com.springreact.model.User;
import com.springreact.repository.MessageRepository;
import com.springreact.service.interfaces.IMessageService;

@Service
public class MessageService implements IMessageService{

    @Autowired
    private MessageRepository messageRepository;
    
    @Override
    public void saveMessage(Messages message){
        messageRepository.save(message);
    }

    @Override 
    public Integer getMessagesBySenderAndProperty(User sender, Property property){
        
        return messageRepository.findNumberMessagesBySenderAndProperty(sender, property);
    }

    @Override
    public Page<Messages> getmessagesByReceiver(User receiver, Pageable pageable){
        return messageRepository.findByReceiverOrderByCreatedAtDesc(receiver, pageable);
    }

    @Override
    public Integer getNumberOfMessagesByusername(String receiverUsername){
        return messageRepository.findNumberOfMessages(receiverUsername);
    }

    @Override
    public Messages getMessageById(Integer messageId){
        Optional<Messages> optional = messageRepository.findById(messageId);
        if (optional.isPresent()) {
            return optional.get();
        }
        return null;
    }

    @Override
    public void removeMessage(Messages messages){
        messageRepository.delete(messages);
    }
}
