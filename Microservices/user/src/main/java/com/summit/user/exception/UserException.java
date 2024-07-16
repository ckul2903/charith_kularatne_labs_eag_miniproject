package com.summit.user.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class UserException extends RuntimeException{

    private final HttpStatus httpCode = HttpStatus.INTERNAL_SERVER_ERROR;

    public UserException(){
        super("Exception occurred : Internal server error");
    }

    public UserException(String message){
        super(message);
    }
}
