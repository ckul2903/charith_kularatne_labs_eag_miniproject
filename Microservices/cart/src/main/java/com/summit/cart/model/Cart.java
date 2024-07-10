package com.summit.cart.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table
public class Cart {

    @Column(name = "cart_id")
    private @Id String cartId;

    @Column(name = "user_id")
    private String userId;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL)
    private List<CartItem> cartItemList;

    public void addToCart(CartItem item){
        cartItemList.add(item);
    }

    @Override
    public String toString(){
        return "CartID: "+cartId+"\nUserID: "+userId+"\nItems in cart: "+cartItemList.size();
    }
}
