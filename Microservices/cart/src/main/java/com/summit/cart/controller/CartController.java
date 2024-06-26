package com.summit.cart.controller;

import com.summit.cart.controller.parent.ParentController;
import com.summit.cart.dto.responses.ResponseObject;
import com.summit.cart.model.Cart;
import com.summit.cart.service.impl.implCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/carts")
public class CartController extends ParentController {

    private final implCartService cartService;

    @Autowired
    public CartController(implCartService cartService){
        this.cartService = cartService;
    }

    @GetMapping
    ResponseEntity<ResponseObject> getCarts(){
        try {
            List<Cart> carts = cartService.getCarts();
            return sendSuccessResponse(carts);
        } catch (Exception e){
            return sendInternalError();
        }
    }

    @PostMapping
    ResponseEntity<ResponseObject> createCart(@RequestBody String userId, List<String> lineItems){
        try {
            Cart res = cartService.createCart(userId,lineItems);
            return sendCreatedResponse(res);
        } catch(Exception e){
            return sendInternalError();
        }
    }

    @GetMapping("/{cartId}")
    ResponseEntity<ResponseObject> getCartById(@PathVariable String cartId){
        try{
            Cart res = cartService.getCartById(cartId);
            return sendSuccessResponse(res);
        }catch (Exception e){
            return sendInternalError();
        }
    }

    @GetMapping("/{cartId}")
    ResponseEntity<ResponseObject> deleteCartById(@PathVariable String cartId){
        try{
            cartService.deleteCartById(cartId);
            return sendSuccessResponse();
        }catch (Exception e){
            return sendInternalError();
        }
    }

    @PutMapping("/{cartId}/products/")
    ResponseEntity<ResponseObject> updateProducts(@RequestBody String cartId, List<String> productIdList){
        try{
            cartService.updateProducts(cartId,productIdList);
            return sendSuccessResponse();
        }catch (Exception e){
            return sendInternalError();
        }
    }
}
