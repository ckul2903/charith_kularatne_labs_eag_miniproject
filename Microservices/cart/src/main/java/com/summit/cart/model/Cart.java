package com.summit.cart.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.util.List;

@Entity
public class Cart {
    private @Id String cartId;
    private String userId;
    private List<String> lineItems;       //TODO: Implement a List to hold Product objects

    public Cart(){}

    public Cart(String userId, List<String> lineItems){
        this.userId = userId;
        this.cartId = userId;   // Assuming each cart is assigned to one user
        this.lineItems = lineItems;
    }

    public  void setLineItems(List<String> items){
        this.lineItems = items;
    }
}
