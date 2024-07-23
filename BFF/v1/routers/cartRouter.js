const express = require('express');
const axios = require('axios');
const baseUrl = require('../constants/constants');
const cartController = require('../controller/cartController')

class CartRouter{
    constructor(){
        this.router = express.Router();
        this.controller = new cartController();
        this.initializeRoutes();
    }
    
    initializeRoutes(){
    this.router.get('/', this.controller.getCarts);
    this.router.post('/', this.controller.createCart);
    this.router.get('/:id', this.controller.getCartById);
    this.router.delete('/:id', this.controller.deleteCartById);
    this.router.patch('/:id', this.controller.updateCart);
    }

    getRouter(){
        return this.router;
    }
}

module.exports = CartRouter;