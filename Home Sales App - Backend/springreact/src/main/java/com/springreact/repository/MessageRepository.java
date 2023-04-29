package com.springreact.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.springreact.model.Messages;
import com.springreact.model.Property;
import com.springreact.model.User;

public interface MessageRepository extends JpaRepository<Messages, Integer>{
    
    @Query("SELECT COUNT(m.id) FROM Messages m WHERE m.sender = :sender AND m.property = :property")
    Integer findNumberMessagesBySenderAndProperty(@Param("sender") User sender, @Param("property") Property property);

    @Query("SELECT COUNT(m.id) FROM Messages m INNER JOIN User u WHERE m.receiver = u.id AND u.username = :username GROUP BY(m.receiver)")
    Integer findNumberOfMessages(@Param("username") String username);

    Page<Messages> findByReceiverOrderByCreatedAtDesc(User receiver, Pageable pageable);
}
