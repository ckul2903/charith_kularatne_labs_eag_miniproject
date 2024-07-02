package com.summit.product.service;

import com.summit.product.model.Product;

import java.util.List;

public interface ProductService {

    List<Product> getProducts();

    Product getProductById(String itemId);

    Product addNewProduct(Product product);

    void removeProduct(String itemId);

    void updateProductDetails(String itemId);

    List<String> getAllCategories();

}
