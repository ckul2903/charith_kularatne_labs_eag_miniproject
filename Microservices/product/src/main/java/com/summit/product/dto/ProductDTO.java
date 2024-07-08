package com.summit.product.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@Data
public class ProductDTO {

    private String productId;

    private String name;

    private String description;

    private String category;

    private double price;

    private String brand;
}
