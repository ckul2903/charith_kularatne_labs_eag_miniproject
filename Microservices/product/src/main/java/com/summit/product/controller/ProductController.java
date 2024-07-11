package com.summit.product.controller;

import com.summit.product.dto.ResponseObject;
import com.summit.product.model.Product;
import com.summit.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ProductController extends AbstractController{

    private final ProductService productService;

    @GetMapping("products")
    ResponseEntity<ResponseObject> getAllProducts(){
        return sendSuccessResponse(productService.getProducts());
    }

    @PostMapping("products")
    ResponseEntity<ResponseObject> createProduct(@RequestBody Product product){
        return sendCreatedResponse(productService.addNewProduct(product));
    }

    @GetMapping("products/{productId}")
    ResponseEntity<ResponseObject> getProductById(@PathVariable String productId){
        return sendSuccessResponse(productService.getProductById(productId));
    }

    @PutMapping("products/{productId}")
    ResponseEntity<ResponseObject> updateProduct(@RequestBody Product product){
        return sendSuccessResponse(productService.updateProductDetails(product));
    }

    @DeleteMapping("products/{productId}")
    ResponseEntity<ResponseObject> deleteProduct(@PathVariable String productId){
        productService.removeProduct(productId);
        return sendNoContentResponse();
    }

    @GetMapping("products/categories")
    ResponseEntity<ResponseObject> getAllCategories(){
        return sendSuccessResponse(productService.getAllProductCategories());
    }
}
