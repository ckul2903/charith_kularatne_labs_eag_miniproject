package com.summit.user.service;

import com.summit.user.model.User;

import java.util.List;

public interface UserService {

    List<User> getUsers();

    User getUserById(String userId);

    User addNewUser(User user);

    void removeUser(String userId);

    User updateUserDetails(User user);

}
