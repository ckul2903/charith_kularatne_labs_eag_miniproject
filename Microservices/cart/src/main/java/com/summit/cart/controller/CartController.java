package com.summit.cart.controller;

import com.summit.cart.dto.CartDTO;
import com.summit.cart.dto.ResponseObject;
import com.summit.cart.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class CartController extends AbstractController {

    private final CartService cartService;

    @GetMapping("carts")
    ResponseEntity<ResponseObject> getCarts(){
        return sendSuccessResponse(cartService.getCarts());
    }

    @PostMapping("carts")
    ResponseEntity<ResponseObject> createCart(@RequestBody CartDTO cartDto){
        return sendCreatedResponse(cartService.createCart(cartDto));
    }

    @GetMapping("carts/{cartId}")
    ResponseEntity<ResponseObject> getCartById(@PathVariable String cartId){
        return sendSuccessResponse(cartService.getCartById(cartId));
    }

    @DeleteMapping("carts/{cartId}")
    ResponseEntity<ResponseObject> deleteCartById(@PathVariable String cartId){
        cartService.deleteCartById(cartId);
        return sendNoContentResponse();
    }

    @PatchMapping("carts/{cartId}")
    ResponseEntity<ResponseObject> updateCart(@PathVariable String cartId, @RequestBody CartDTO cartDto){
        return sendSuccessResponse(cartService.updateCart(cartId,cartDto));
    }
}
