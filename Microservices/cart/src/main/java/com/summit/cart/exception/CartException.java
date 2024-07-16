package com.summit.cart.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class CartException extends RuntimeException{
    private final HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    public CartException(){
        super("Exception occurred : Internal server error");
    }

    public CartException(String message){
        super(message);
    }
}
