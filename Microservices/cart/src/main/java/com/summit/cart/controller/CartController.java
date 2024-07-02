package com.summit.cart.controller;

import com.summit.cart.dto.request.CartDTO;
import com.summit.cart.dto.responses.ResponseObject;
import com.summit.cart.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/carts")
public class CartController extends AbstractController {

    @Autowired
    private final CartService cartService;

    @GetMapping
    ResponseEntity<ResponseObject> getCarts(){
        return sendSuccessResponse(cartService.getCarts());
    }

    @PostMapping
    ResponseEntity<ResponseObject> createCart(@RequestBody CartDTO cartDto){
        return sendCreatedResponse(cartService.createCart(cartDto));
    }

    @GetMapping("/{cartId}")
    ResponseEntity<ResponseObject> getCartById(@PathVariable String cartId){
        return sendSuccessResponse(cartService.getCartById(cartId));
    }

    @DeleteMapping("/{cartId}")
    ResponseEntity<ResponseObject> deleteCartById(@PathVariable String cartId){
        cartService.deleteCartById(cartId);
        return sendNoContentResponse();
    }

    @PutMapping("/{cartId}")
    ResponseEntity<ResponseObject> updateCart(@RequestBody CartDTO cartDto){
        cartService.updateCart(cartDto);
        return sendSuccessResponse(cartDto);
    }
}
