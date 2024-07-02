package com.summit.cart.dto.request;

import com.summit.cart.model.CartItem;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class CartDTO {

    private final String cartId;

    private List<CartItem> cartItemList;

}
