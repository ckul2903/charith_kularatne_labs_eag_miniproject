package com.summit.user.controller;

import com.summit.user.dto.ResponseObject;
import com.summit.user.model.User;
import com.summit.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class UserController extends AbstractController{

    private final UserService userService;

    @GetMapping("users")
    ResponseEntity<ResponseObject> getAllUsers(){
        return sendSuccessResponse(userService.getUsers());
    }

    @PostMapping("users")
    ResponseEntity<ResponseObject> createUser(@RequestBody User user){
        return sendCreatedResponse(userService.addNewUser(user));
    }

    @GetMapping("users/{userId}")
    ResponseEntity<ResponseObject> getUserById(@PathVariable String userId){
        return sendSuccessResponse(userService.getUserById(userId));
    }

    @PutMapping("users/{userId}")
    ResponseEntity<ResponseObject> updateUser(@RequestBody User user){
        return sendSuccessResponse(userService.updateUserDetails(user));
    }

    @DeleteMapping("users/{userId}")
    ResponseEntity<ResponseObject> deleteUser(@PathVariable String userId){
        userService.removeUser(userId);
        return sendNoContentResponse();
    }
}
