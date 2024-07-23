package com.summit.user.service;

import com.summit.user.model.UserEntity;

import java.util.List;

public interface UserService {

    List<UserEntity> getUsers();

    UserEntity getUserById(String userId);

    UserEntity addNewUser(UserEntity user);

    void removeUser(String userId);

    UserEntity updateUserDetails(UserEntity user);

}
