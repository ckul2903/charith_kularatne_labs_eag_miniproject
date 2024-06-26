package com.summit.cart.dto.exception;

public class CartNotFoundException extends RuntimeException{
    public CartNotFoundException(String error){
        super(error);
    }
}
