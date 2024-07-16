package com.summit.cart.exception;

import com.summit.cart.model.Cart;
import lombok.Getter;
import org.springframework.http.HttpStatus;

public class CartNotFoundException extends CartException {

    HttpStatus httpStatus = HttpStatus.NOT_FOUND;

    public CartNotFoundException(String cartId){
        throw new CartException("Cart not found");
    }

}
