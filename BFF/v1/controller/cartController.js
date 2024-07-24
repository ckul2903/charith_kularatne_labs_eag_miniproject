const errorResponses = require('../exception/errorResponses');
const logger = require('../config/logger');
const CartService = require('../service/cartService')

const cartService = new CartService();

class CartController{    
    async getCarts(req,res){
        try {
            const carts = await cartService.getCarts();
            res.status(200).json(carts)
        } catch (error) {
            logger.error("Cart controller | Exception occured: ",error.cause);
            res.status(500).json(errorResponses.INTERNAL_SERVER_ERROR)
        }
    }

    async createCart(req,res){
        try{
            const newCart = await cartService.createCart(req.body);
            res.status(201).json(newCart);
        } catch(error){
            logger.error("Cart controller | Exception occured: ",error.cause);
            res.status(500).json(errorResponses.INTERNAL_SERVER_ERROR)
        }
    }
    
    async getCartById(req,res){
        try{
            const cart = await cartService.getCartById(req.params.id);
            res.status(200).json(cart);
        } catch(error){
            logger.error("Cart controller | Exception occured: ",error.cause);
            res.status(500).json(errorResponses.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteCartById(req,res){
        try{
            await cartService.deleteCartById(req.params.id);
            res.status(204).json();
        } catch(error){
            logger.error("Cart controller | Exception occured: ",error.cause);
            res.status(500).json(errorResponses.INTERNAL_SERVER_ERROR)
        }
    }

    async updateCart(req,res){
        try{
            const newCart = await cartService.updateCart(req.params.id,req.body);
            res.status(200).json(newCart);
        } catch(error){
            logger.error("Cart controller | Exception occured: ",error.cause);
            res.status(500).json(errorResponses.INTERNAL_SERVER_ERROR)
        }
    }
}

module.exports = CartController;