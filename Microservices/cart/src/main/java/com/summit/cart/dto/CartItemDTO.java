// NEEDED?
package com.summit.cart.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Getter
@Builder
@Data
public class CartItemDTO {

    private String cartId;

    private String itemId;

    private int quantity;

}
