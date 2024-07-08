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

    @GetMapping("products/{itemId}")
    ResponseEntity<ResponseObject> getProductById(@PathVariable String itemId){
        return sendSuccessResponse(productService.getProductById(itemId));
    }

    @PutMapping("products/{itemId}")
    ResponseEntity<ResponseObject> updateProduct(@RequestBody Product product){
        return sendSuccessResponse(productService.updateProductDetails(product));
    }

    @DeleteMapping("products/{itemId}")
    ResponseEntity<ResponseObject> deleteProduct(@PathVariable String itemId){
        productService.removeProduct(itemId);
        return sendNoContentResponse();
    }

    @GetMapping("products/categories")
    ResponseEntity<ResponseObject> getAllCategories(){
        return sendSuccessResponse(productService.getAllCategories());
    }
}
