package com.summit.product.service.impl;

import com.summit.product.exception.GenericException;
import com.summit.product.exception.ProductNotFoundException;
import com.summit.product.model.Product;
import com.summit.product.repository.ProductRepository;
import com.summit.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;


    @Override
    public List<Product> getProducts() {
        try{
            log.info("PRODUCT SERVICE | Listing all products");
            return productRepository.findAll();
        } catch (Exception exception){
            log.error("PRODUCT SERVICE | Failed with exception : {}", exception.getMessage());
            throw new GenericException();
        }
    }

    @Override
    public Product getProductById(String itemId) {
        log.info("PRODUCT SERVICE | Getting product {}",itemId);
        try {
            return productRepository.findById(itemId).orElseThrow(
                    ()-> new ProductNotFoundException(itemId)
            );
        }catch (ProductNotFoundException productNotFoundException){
            log.error("PRODUCT SERVICE | PRODUCT NOT FOUND");
            throw productNotFoundException;
        }catch (Exception exception){
            log.error("PRODUCT SERVICE | Query failed | Product ID:{} failed with exception {}",itemId,exception.getMessage());
            throw new GenericException();
        }
    }

    @Override
    public Product addNewProduct(Product product) {
        log.info("PRODUCT SERVICE | Creating product {}",product.getProductId());
        try {
            return productRepository.save(product);
        } catch (Exception exception){
            log.error("PRODUCT SERVICE | Create failed | Product ID:{} failed with exception {}",product.getProductId(),exception.getMessage());
            throw new GenericException();
        }
    }

    @Override
    public void removeProduct(String itemId) {
        log.info("PRODUCT SERVICE | Deleting product {}",itemId);
        try{
            productRepository.deleteById(itemId);
        } catch (Exception exception){
            log.error("CART SERVICE | Delete failed | Product ID:{} failed with exception {}",itemId,exception.getMessage());
            throw new GenericException();
        }
    }

    @Override
    public Product updateProductDetails(Product product) {
        log.info("PRODUCT SERVICE | Updating product {}",product.getProductId());
        try {
                return productRepository.save(product);
        }catch (ProductNotFoundException productNotFoundException){
            log.error("PRODUCT SERVICE | Product not found");
            throw productNotFoundException;
        }catch (Exception exception){
            log.error("PRODUCT SERVICE | Update failed | Product ID:{} failed with exception {}",product.getProductId(),exception.getMessage());
            throw new GenericException();
        }
    }

    @Override
    public List<String> getAllCategories() {
        try {
            List<String> categories = new ArrayList<>();
            for(Product product : getProducts()){
                categories.add(product.getCategory());
            }
            return categories;
        } catch (Exception exception) {
            log.error("PRODUCT SERVICE | Query failed | failed with exception {}",exception.getMessage());
            throw new GenericException();
        }
    }
}
