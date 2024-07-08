package com.summit.cart.dto;

import com.summit.cart.model.CartItem;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@Data
public class CartDTO {

    private final String cartId;

    private List<CartItem> cartItemList;
}
