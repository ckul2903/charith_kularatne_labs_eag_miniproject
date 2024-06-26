package com.summit.cart.repository;

import com.summit.cart.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public  interface CartRepository extends JpaRepository<Cart,String> {
}
