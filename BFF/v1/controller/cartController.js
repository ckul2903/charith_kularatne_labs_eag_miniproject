import logger from '../config/logger.js';
import CartService from '../service/cartService.js';

const cartService = new CartService();

class CartController{    
    async getCarts(req,res){
        try {
            const carts = await cartService.getCarts();
            res.status(200).json(carts)
        } catch (error) {
            logger.error("Cart Controller | Get carts | ",error);
            res.status(error.statusCode).json(error.cause);
        }
    }

    async createCart(req,res){
        try{
            const newCart = await cartService.createCart(req.body);
            res.status(201).json(newCart);
        } catch(error){
            logger.error("Cart Controller | Create carts | ",error);
            res.status(error.statusCode).json(error.cause);
        }
    }
    
    async getCartById(req,res){
        try{
            const cart = await cartService.getCartById(req.params.id);
            res.status(200).json(cart);
        } catch(error){
            logger.error("Cart Controller | Get cart by ID | ",error);
            res.status(error.statusCode).json(error.cause);
        }
    }

    async deleteCartById(req,res){
        try{
            await cartService.deleteCartById(req.params.id);
            res.status(204).json();
        } catch(error){
            logger.error("Cart Controller | Delete cart | ",error);
            res.status(error.statusCode).json(error.cause);
        }
    }

    async updateCart(req,res){
        try{
            const newCart = await cartService.updateCart(req.params.id,req.body);
            res.status(200).json(newCart);
        } catch(error){
            logger.error("Cart Controller | Update cart | ",error);
            res.status(error.statusCode).json(error.cause);
        }
    }
}

export default CartController;