package com.summit.cart.exception;

import com.summit.cart.model.Cart;
import lombok.Getter;
import org.springframework.http.HttpStatus;

public class CartNotFoundException extends CartException {

    public CartNotFoundException(String cartId){
        throw new CartException("Cart not found", HttpStatus.NOT_FOUND);
    }

}
