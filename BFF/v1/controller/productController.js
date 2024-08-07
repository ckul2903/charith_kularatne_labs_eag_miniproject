import logger from '../config/logger.js';
import ProductService from '../service/productService.js';

const productService = new ProductService();

class ProductController{    
    async getProducts(req,res){
        try {
            const products = await productService.getProducts();
            logger.info("Product Controller | Got products");
            res.status(200).json(products)
        } catch (error) {
            logger.error("Product Controller | Get products | ",error.cause);
            res.status(error.statusCode).json(error.cause);
        }
    }

    async createProduct(req,res){
        try{
            const newProduct = await productService.addNewProduct(req.body);
            logger.info("Product Controller | Created product",newProduct.data.name);
            res.status(201).json(newProduct);
        } catch(error){
            logger.error("Product Controller | Create product | ",error.cause);
            res.status(error.statusCode).json(error.cause);
        }
    }
    
    async getProductById(req,res){
        try{
            const product = await productService.getProductById(req.params.id);
            logger.info("Product Controller | Got product", product.data.name);
            res.status(200).json(product);
        } catch(error){
            logger.error("Product Controller | Get product by ID | ",error.cause);
            res.status(error.statusCode).json(error.cause);
        }
    }

    async deleteProductById(req,res){
        try{
            await productService.removeProduct(req.params.id);
            logger.info("Product Controller | Delete product | Success");
            res.status(204).json();
        } catch(error){
            logger.error("Product Controller | Delete product by ID | ",error.cause);
            res.status(error.statusCode).json(error.cause);
        }
    }

    async updateProduct(req,res){
        try{
            const newProduct = await productService.updateProduct(req.params.id,req.body);
            logger.info("Product Controller | Update product | Successfully updated",req.params.id)
            res.status(200).json(newProduct);
        } catch(error){
            logger.error("Product Controller | Update product | ",error.cause);
            res.status(error.statusCode).json(error.cause);
        }
    }

    async getProductCategories(req,res){
        try {
            const categories = await productService.getProductCategories();
            logger.info("Product Controller | Get product categories | Success");
            res.status(200).json(categories)
        } catch (error) {
            logger.error("Product Controller | Get product categories | ",error.cause);
            res.status(error.statusCode).json(error.cause);
        }
    }
}

export default ProductController;