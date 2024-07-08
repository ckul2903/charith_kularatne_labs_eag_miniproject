package com.summit.product.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Data
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table
public class Product {

    private @Id String productId;

    private String name;

    private String description;

    private String category;

    private double price;

    private String brand;
}
