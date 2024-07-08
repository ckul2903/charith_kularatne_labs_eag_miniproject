package com.summit.cart.service;

import com.summit.cart.dto.CartDTO;
import com.summit.cart.model.Cart;

import java.util.List;

public interface CartService {

    List<Cart> getCarts();

    Cart createCart(CartDTO cartDto);

    Cart getCartById(String cartId);

    void deleteCartById(String cartId);

    Cart updateCart(String cartId, CartDTO cartDto);
}
