package com.summit.cart.dto.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;


@Getter
public class CartNotFoundException extends RuntimeException{

    private final HttpStatus httpCode = HttpStatus.NOT_FOUND;

    public CartNotFoundException(String cartId){
        super(cartId + " not found");
    }

}
