const express = require('express');
const axios = require('axios');
const baseUrl = require('../constants/constants');
const productController = require('../controller/productController')

class ProductRouter{
    constructor(){
        this.router = express.Router();
        this.controller = new productController();
        this.initializeRoutes();
    }
    
    initializeRoutes(){
    this.router.get('/', this.controller.getProducts);
    this.router.post('/', this.controller.createProduct);
    this.router.get('/:id', this.controller.getProductById);
    this.router.delete('/:id', this.controller.deleteProductById);
    this.router.patch('/:id', this.controller.updateProduct);
    this.router.get('/categories',this.controller.getProductCategories);
    }

    getRouter(){
        return this.router;
    }
}

module.exports = ProductRouter;