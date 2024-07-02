package com.summit.cart.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.*;

import java.util.List;

@Data
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "CART")
public class Cart {

    private @Id String cartId;

    private String userId;

    @OneToMany(mappedBy = "cart")
    private List<CartItem> cartItemList;

}
