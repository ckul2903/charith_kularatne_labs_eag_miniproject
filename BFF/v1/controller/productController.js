import axios from 'axios';
import logger from '../config/logger.js';
import ProductService from '../service/productService.js';

const productService = new ProductService();

class ProductController{    
    async getProducts(req,res){
        try {
            const products = await productService.getProducts();
            res.status(200).json(products)
        } catch (error) {
            logger.error("Product controller | Exception occured: ",error.cause);
            res.status(500).json(axios.HttpStatusCode.InternalServerError)
        }
    }

    async createProduct(req,res){
        try{
            const newProduct = await productService.addNewProduct(req.body);
            res.status(201).json(newProduct);
        } catch(error){
            logger.error("Product controller | Exception occured: ",error.cause);
            res.status(500).json(axios.HttpStatusCode.InternalServerError)
        }
    }
    
    async getProductById(req,res){
        try{
            const product = await productService.getProductById(req.params.id);
            res.status(200).json(product);
        } catch(error){
            logger.error("Product controller | Exception occured: ",error.cause);
            res.status(500).json(axios.HttpStatusCode.InternalServerError)
        }
    }

    async deleteProductById(req,res){
        try{
            await productService.removeProduct(req.params.id);
            res.status(204).json();
        } catch(error){
            logger.error("Product controller | Exception occured: ",error.cause);
            res.status(500).json(axios.HttpStatusCode.InternalServerError)
        }
    }

    async updateProduct(req,res){
        try{
            const newProduct = await productService.updateProduct(req.params.id,req.body);
            res.status(200).json(newProduct);
        } catch(error){
            logger.error("Product controller | Exception occured: ",error.cause);
            res.status(500).json(axios.HttpStatusCode.InternalServerError)
        }
    }

    async getProductCategories(req,res){
        try {
            const categories = await productService.getProductCategories();
            res.status(200).json(categories)
        } catch (error) {
            logger.error("Product controller | Exception occured: ",error.cause);
            res.status(500).json(axios.HttpStatusCode.InternalServerError)
        }
    }
}

export default ProductController;