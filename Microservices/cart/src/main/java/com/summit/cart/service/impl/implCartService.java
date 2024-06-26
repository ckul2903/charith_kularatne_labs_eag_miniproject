package com.summit.cart.service.impl;

import com.summit.cart.dto.exception.CartNotFoundException;
import com.summit.cart.model.Cart;
import com.summit.cart.repository.CartRepository;
import com.summit.cart.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Service
public class implCartService implements CartService {

    private final CartRepository cartRepository;
    private static final Logger LOGGER = LoggerFactory.getLogger(implCartService.class);

    @Autowired
    public implCartService(CartRepository cartRepository){
        this.cartRepository = cartRepository;
    }

    public List<Cart> getCarts(){
        try {
            LOGGER.info("CART SERVICE | Getting all carts");
            return cartRepository.findAll();
        } catch (Exception exception){
            LOGGER.error("CART SERVICE | Couldn't get all carts : {}", exception);
            throw exception;
        }
    }

    public Cart createCart(String userId, List<String> lineItems){
        try {
            LOGGER.info("CART SERVICE | Creating new cart | ID:{}",userId);
            Cart newCart = new Cart(userId,lineItems);
            return cartRepository.save(newCart);
        } catch (Exception exception) {
            LOGGER.error("CART SERVICE | Create failed : {}",exception);
            throw exception;
        }
    }

    public Cart getCartById(String cartId){
        try {
            LOGGER.info("CART SERVICE | Getting cart | ID:{}",cartId);
            return cartRepository.findById(cartId).orElseThrow(
                    ()-> new CartNotFoundException("Cart with id "+cartId+" not found")
            );
        } catch (CartNotFoundException cartNotFoundException) {
            LOGGER.error("CART SERVICE | Cart not found | Cart ID:{} failed with exception {}",cartId,cartNotFoundException);
            throw cartNotFoundException;
        } catch (Exception exception){
            LOGGER.error("CART SERVICE | Query failed | Cart ID:{} failed with exception {}",cartId,exception);
            throw  exception;
        }
    }

    public void deleteCartById(String cartId){
        try {
            LOGGER.info("CART SERVICE | Deleting cart | ID:{}",cartId);
            cartRepository.deleteById(cartId);
        } catch (Exception exception) {
            LOGGER.error("CART SERVICE | Delete failed | Cart ID:{} failed with exception {}",cartId,exception);
            throw exception;
        }
    }

    public void updateProducts(String cartId, List<String> productIdList){  // TODO : Add Product object
        try {
            LOGGER.info("CART SERVICE | Updating cart | ID:{}",cartId);
            Cart currentCart = getCartById(cartId);
            currentCart.setLineItems(productIdList);
            cartRepository.save(currentCart);
        } catch (Exception exception) {
            LOGGER.error("CART SERVICE | Update failed | Cart ID:{} failed with exception {}",cartId,exception);
            throw exception;
        }
    }
}
