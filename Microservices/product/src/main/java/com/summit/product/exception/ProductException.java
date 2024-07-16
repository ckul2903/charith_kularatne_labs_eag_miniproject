package com.summit.product.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ProductException extends RuntimeException{

    private final HttpStatus httpCode = HttpStatus.INTERNAL_SERVER_ERROR;

    public ProductException(){
        super("Exception occurred : Internal server error");
    }

    public ProductException(String message){
        super(message);
    }
}
