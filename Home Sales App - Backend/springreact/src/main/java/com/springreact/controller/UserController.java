package com.springreact.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springreact.customeObjects.createUserDTO;
import com.springreact.helpers.GenerateCode;
import com.springreact.helpers.Util;
import com.springreact.model.User;
import com.springreact.service.interfaces.IUserService;
import com.springreact.service.services.EmailService;

@RestController
@RequestMapping("/api/user") 
public class UserController {

    @Autowired
    private IUserService userService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${propertiesapp.baseurl.recoverpassword}")
    private String baserecoverPwdUrl;

    @Value("${spring.mail.username}")
    private String emailSender;

    @Value("${propertiesapp.path.images}")
    private String imgsPath;
    
    @GetMapping("/get-user-public-details/{id}")
    public ResponseEntity<HashMap<String, Object>> showPublicUserDetails(@PathVariable("id") Integer userId){

        // response data
        HashMap<String, Object> responseData = new HashMap<String, Object>();

        // verify user exists
        User user = userService.getUserById(userId);

        if (user == null) {
            responseData.put("ok", false);
            responseData.put("msg", "User does not exist");

            return ResponseEntity.badRequest().body(responseData);
        }

        // Remove password
        user.setPassword(null);

        responseData.put("ok", true);
        responseData.put("msg", "User found");
        responseData.put("user", user);

        return ResponseEntity.ok().body(responseData);
    }

    @PostMapping("/request-update-password")
    public ResponseEntity<HashMap<String, Object>> updatePasswordRequest(@RequestBody HashMap<String, Object> body){

        HashMap<String, Object> responseData = new HashMap<String, Object>();

        String userEmail = body.get("userEmail").toString();

        // verify user with email exists
        User user = userService.getUserByEmail(userEmail);
        if(user == null){
            responseData.put("ok", false);
            responseData.put("msg", "User does not exist");
            return ResponseEntity.badRequest().body(responseData);
        }

        // Generate code
        String generatedCode = GenerateCode.generateCode();

        // save code in database
        user.setRegister_code(generatedCode);
        userService.updateUser(user);

        // proceed to send email
        String recoverLink = baserecoverPwdUrl+generatedCode;

        try {
            emailService.sendPasswordRecoverEmail(emailSender, userEmail, recoverLink);
            responseData.put("ok", true);
            responseData.put("msg", "Email has been sent successfully to your email address.");
            return ResponseEntity.ok().body(responseData);
        } catch (Exception e) {
            responseData.put("ok", false);
            responseData.put("msg", "Failed to send recover password email");
            return ResponseEntity.badRequest().body(responseData);
        }
    }

    @PostMapping("/verify-code")
    public ResponseEntity<HashMap<String, Object>> verifyUserCode(@RequestBody HashMap<String, String> body){

        HashMap<String, Object> responseData = new HashMap<String, Object>();

        String code = body.get("code");

        // verify if the code is valid
        User user = userService.getUserByCode(code);

        if(user == null){
            responseData.put("ok", false);
            responseData.put("msg", "Invalid Code");
            return ResponseEntity.badRequest().body(responseData);
        }

        responseData.put("ok", true);
        responseData.put("msg", "Valid Code");

        return ResponseEntity.ok().body(responseData);
    }

    @PostMapping("/update-password")
    public ResponseEntity<HashMap<String, Object>> updateUserPassword(@RequestBody HashMap<String, String> body){

        HashMap<String, Object> responseData = new HashMap<String, Object>();

        try {
            
            // getting the user by code
            String code = body.get("code");
            User user = userService.getUserByCode(code);
    
            // update password
            String password = body.get("password");
            String enc_password = passwordEncoder.encode(password);
            user.setPassword(enc_password);
    
            // remove code
            user.setRegister_code(null);
    
            // update user
            userService.updateUser(user);

            responseData.put("ok", true);
            responseData.put("msg", "Password Has been Updated Successfully");

            return ResponseEntity.ok().body(responseData);

        } catch (Exception e) {
            
            responseData.put("ok", false);
            responseData.put("msg", "We could not update your password. Try again later");

            return ResponseEntity.badRequest().body(responseData);

        }


    }

    @GetMapping("/get-user-details/{username}")
    public ResponseEntity<HashMap<String, Object>> showUserDetails(@PathVariable("username") String username){

        // response data
        HashMap<String, Object> responseData = new HashMap<String, Object>();

        // verify user exists
        User user = userService.getUserByUsername(username);

        if (user == null) {
            responseData.put("ok", false);
            responseData.put("msg", "User does not exist");

            return ResponseEntity.badRequest().body(responseData);
        }

        // Remove password
        user.setPassword(null);

        responseData.put("ok", true);
        responseData.put("msg", "User found");
        responseData.put("user", user);

        return ResponseEntity.ok().body(responseData);
    }

    @PutMapping("/update-user-details")
    public ResponseEntity<HashMap<String, Object>> updateUserDetails(@ModelAttribute createUserDTO userData){

        HashMap<String, Object> responseData = new HashMap<String, Object>();

        Integer userId = userData.getId();

        User user = userService.getUserById(userId);

        if(user != null){

            if(userData.getName() != null){
                user.setName(userData.getName());
            }

            if(userData.getEmail() != null){
                // verify the email is not used by other user
                User user2 = userService.getUserByEmail(userData.getEmail());
                if(user2.getId() == user.getId() || user2 == null){
                    user.setEmail(userData.getEmail());
                }else{
                    responseData.put("ok", false);
                    responseData.put("msg", "The email address is already in use");
                    return ResponseEntity.badRequest().body(responseData);
                }
            }

            if(userData.getUsername() != null){
                // verify the username is not used by other user
                User user2 = userService.getUserByUsername(userData.getUsername());
                if(user2.getId() == user.getId() || user2 == null){
                    user.setUsername(userData.getUsername());
                }else{
                    responseData.put("ok", false);
                    responseData.put("msg", "The username is already in use");
                    return ResponseEntity.badRequest().body(responseData);
                }
            }

            if(!userData.getPhoto_url().isEmpty() && !user.getPhoto_url().equals(userData.getPhoto_url().getOriginalFilename())){
                String fileName = Util.saveFile(userData.getPhoto_url(), imgsPath);
                if(fileName != null){
                    user.setPhoto_url(fileName);
                }
            }

            if(userData.getDescription() != null){
                user.setDescription(userData.getDescription());
            }

            userService.updateUser(user);

            responseData.put("ok", true);
            responseData.put("msg", "Your information has been updated successfully");

            return ResponseEntity.ok().body(responseData);
        }else{
            responseData.put("ok", false);
            responseData.put("msg", "An error occurred trying to update your information. Please try again later.");
            return ResponseEntity.internalServerError().body(responseData);
        }
    }

}
