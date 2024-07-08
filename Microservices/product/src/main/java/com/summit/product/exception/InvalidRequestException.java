package com.summit.product.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class InvalidRequestException extends RuntimeException{

    private final HttpStatus httpCode = HttpStatus.BAD_REQUEST;

    public InvalidRequestException(String error){
        super(error);
    }
}
