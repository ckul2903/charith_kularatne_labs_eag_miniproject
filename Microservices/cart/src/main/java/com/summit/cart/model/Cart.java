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
    private @Id String cartId;

    private String userId;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL)
    private List<CartItem> cartItemList;

    @Override
    public String toString(){
        return "CartID: "+cartId+"\nUserID: "+userId+"\nItems in cart: "+cartItemList.size();
    }
}
