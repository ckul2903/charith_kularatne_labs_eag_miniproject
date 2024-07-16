package com.summit.user.service.impl;

import com.summit.user.exception.UserException;
import com.summit.user.exception.UserNotFoundException;
import com.summit.user.model.UserEntity;
import com.summit.user.repository.UserRepository;
import com.summit.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;


    @Override
    public List<UserEntity> getUsers() {
        try{
            log.info("PRODUCT SERVICE | Listing all users");
            return userRepository.findAll();
        } catch (Exception exception){
            log.error("PRODUCT SERVICE | Failed with exception : {}", exception.getMessage());
            throw new UserException();
        }
    }

    @Override
    public UserEntity getUserById(String userId) {
        log.info("PRODUCT SERVICE | Getting user {}",userId);
        try {
            return userRepository.findById(userId).orElseThrow(
                    ()-> new UserNotFoundException(userId)
            );
        }catch (UserNotFoundException userNotFoundException){
            log.error("PRODUCT SERVICE | PRODUCT NOT FOUND");
            throw userNotFoundException;
        }catch (Exception exception){
            log.error("PRODUCT SERVICE | Query failed | User ID:{} failed with exception {}",userId,exception.getMessage());
            throw new UserException();
        }
    }

    @Override
    public UserEntity addNewUser(UserEntity user) {
        try {
            UserEntity newUser = userRepository.save(user);
            log.info("PRODUCT SERVICE | Created user {}",user.getUserId());
            return newUser;
        } catch (Exception exception){
            log.error("PRODUCT SERVICE | Create failed | User ID:{} failed with exception {}",user.getUserId(),exception.getMessage());
            throw new UserException();
        }
    }

    @Override
    public void removeUser(String userId) {
        log.info("PRODUCT SERVICE | Deleting user {}",userId);
        try{
            userRepository.deleteById(userId);
        } catch (Exception exception){
            log.error("CART SERVICE | Delete failed | User ID:{} failed with exception {}",userId,exception.getMessage());
            throw new UserException();
        }
    }

    @Override
    public UserEntity updateUserDetails(UserEntity user) {
        log.info("PRODUCT SERVICE | Updating user {}",user.getUserId());
        try {
                return userRepository.save(user);
        }catch (UserNotFoundException userNotFoundException){
            log.error("PRODUCT SERVICE | User not found");
            throw userNotFoundException;
        }catch (Exception exception){
            log.error("PRODUCT SERVICE | Update failed | User ID:{} failed with exception {}",user.getUserId(),exception.getMessage());
            throw new UserException();
        }
    }
}
