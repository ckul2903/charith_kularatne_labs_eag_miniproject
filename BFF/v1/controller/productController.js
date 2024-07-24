const errorResponses = require('../exception/errorResponses');
const ProductService = require('../service/productService')

const productService = new ProductService();

class ProductController{    
    async getProducts(req,res){
        try {
            const products = await productService.getProducts();
            res.status(200).json(products)
        } catch (error) {
            console.log("caught error | controller | get");
            res.status(500).json(errorResponses.INTERNAL_SERVER_ERROR)
        }
    }

    async createProduct(req,res){
        try{
            const newProduct = await productService.addNewProduct(req.body);
            res.status(201).json(newProduct);
        } catch(error){
            console.log("caught error | controller | post");
            res.status(500).json(errorResponses.INTERNAL_SERVER_ERROR)
        }
    }
    
    async getProductById(req,res){
        try{
            const product = await productService.getProductById(req.params.id);
            res.status(200).json(product);
        } catch(error){
            console.log("caught error | controller | get id");
            res.status(500).json(errorResponses.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteProductById(req,res){
        try{
            await productService.removeProduct(req.params.id);
            res.status(204).json();
        } catch(error){
            console.log("caught error | controller | delete id",error);
            res.status(500).json(errorResponses.INTERNAL_SERVER_ERROR)
        }
    }

    async updateProduct(req,res){
        try{
            const newProduct = await productService.updateProduct(req.params.id,req.body);
            res.status(200).json(newProduct);
        } catch(error){
            console.log("caught error | controller | patch");
            res.status(500).json(errorResponses.INTERNAL_SERVER_ERROR)
        }
    }

    async getProductCategories(req,res){
        try {
            const categories = await productService.getProductCategories();
            res.status(200).json(categories)
        } catch (error) {
            console.log("caught error | controller | get");
            res.status(500).json(errorResponses.INTERNAL_SERVER_ERROR)
        }
    }
}

module.exports = ProductController;