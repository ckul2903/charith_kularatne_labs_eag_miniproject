package com.summit.product.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ProductNotFoundException extends ProductException{

    private final HttpStatus httpCode = HttpStatus.NOT_FOUND;

    public ProductNotFoundException(String productId){
        super(productId + " not found");
    }

}
