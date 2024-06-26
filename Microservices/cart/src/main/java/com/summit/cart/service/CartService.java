package com.summit.cart.service;

import com.summit.cart.model.Cart;

import java.util.List;

public interface CartService {

    List<Cart> getCarts();

    Cart createCart(String userId, List<String> lineItems);

    Cart getCartById(String cartId);

    void deleteCartById(String cartId);

    void updateProducts(String cartId, List<String> productIdList);
}
