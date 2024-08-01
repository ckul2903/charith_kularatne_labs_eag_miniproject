import logger from '../config/logger.js';
import ProductService from '../service/productService.js';

const productService = new ProductService();

class ProductController{    
    async getProducts(req,res){
        try {
            const products = await productService.getProducts();
            res.status(200).json(products)
        } catch (error) {
            logger.error("User Controller | Get products | ",error.cause);
            res.status(error.statusCode).json(error.cause);
        }
    }

    async createProduct(req,res){
        try{
            const newProduct = await productService.addNewProduct(req.body);
            res.status(201).json(newProduct);
        } catch(error){
            logger.error("User Controller | Create product | ",error.cause);
            res.status(error.statusCode).json(error.cause);
        }
    }
    
    async getProductById(req,res){
        try{
            const product = await productService.getProductById(req.params.id);
            res.status(200).json(product);
        } catch(error){
            logger.error("User Controller | Get product by ID | ",error.cause);
            res.status(error.statusCode).json(error.cause);
        }
    }

    async deleteProductById(req,res){
        try{
            await productService.removeProduct(req.params.id);
            res.status(204).json();
        } catch(error){
            logger.error("User Controller | Delete product by ID | ",error.cause);
            res.status(error.statusCode).json(error.cause);
        }
    }

    async updateProduct(req,res){
        try{
            const newProduct = await productService.updateProduct(req.params.id,req.body);
            res.status(200).json(newProduct);
        } catch(error){
            logger.error("User Controller | Update product | ",error.cause);
            res.status(error.statusCode).json(error.cause);
        }
    }

    async getProductCategories(req,res){
        try {
            const categories = await productService.getProductCategories();
            res.status(200).json(categories)
        } catch (error) {
            logger.error("User Controller | Get product categories | ",error.cause);
            res.status(error.statusCode).json(error.cause);
        }
    }
}

export default ProductController;