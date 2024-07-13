package com.summit.cart.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class CartException extends RuntimeException{
    private final HttpStatus httpStatus;

    public CartException(){
        super("Exception occurred : Internal server error");
        this.httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    public CartException(String error, HttpStatus httpStatus){
        super("Exception occurred : " + error);
        this.httpStatus = httpStatus;
    }
}
