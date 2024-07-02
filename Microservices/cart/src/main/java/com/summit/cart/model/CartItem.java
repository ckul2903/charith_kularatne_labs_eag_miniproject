package com.summit.cart.model;

import jakarta.persistence.*;

@Entity
@Table(name = "CARTITEMS")
public class CartItem {

    @ManyToOne
    @JoinColumn(name = "cart_id",nullable = false)
    private Cart cart;

    private @Id String itemId;

    private int quantity;


}
