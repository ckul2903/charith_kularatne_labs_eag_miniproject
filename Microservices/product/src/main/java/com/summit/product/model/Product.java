package com.summit.product.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Product {

    private @Id String itemId;

    private String name;

    private String description;

    private String category;

    private double price;

    private String brand;

    public Product(){}

    public Product(String itemId,String name, String description, String category, String brand, double price) {
        this.itemId = itemId;
        this.name = name;
        this.description = description;
        this.category = category;
        this.brand = brand;
        this.price = price;
    }
}
