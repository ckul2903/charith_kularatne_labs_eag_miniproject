package com.summit.user.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class UserNotFoundException extends UserException{

    private final HttpStatus httpCode = HttpStatus.NOT_FOUND;

    public UserNotFoundException(String userId){
        super(userId + " not found");
    }

}
