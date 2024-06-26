package com.summit.cart.dto.exception;

public class InvalidRequestException extends RuntimeException{
    public InvalidRequestException(String error){
        super(error);
    }
}
