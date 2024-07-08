package com.summit.cart.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class GenericException extends RuntimeException{
    private final HttpStatus httpCode = HttpStatus.INTERNAL_SERVER_ERROR;

    public GenericException(){
        super("Exception occurred : Internal server error");
    }
}
