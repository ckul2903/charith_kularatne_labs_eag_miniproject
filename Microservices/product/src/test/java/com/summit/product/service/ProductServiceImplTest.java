package com.summit.product.service;

import com.summit.product.model.Product;
import com.summit.product.repository.ProductRepository;
import com.summit.product.service.impl.ProductServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
public class ProductServiceImplTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductServiceImpl productService;

    @Test
    public void testGetProducts(){
        List<Product> mockProductList = new ArrayList<>();
        mockProductList.add(new Product("123","product1","product","cat1",10,"brand1"));
        when(productRepository.findAll()).thenReturn(mockProductList);

        List<Product> result = productService.getProducts();

        assertEquals(result,mockProductList);
        verify(productRepository, times(1)).findAll();
    }
}
