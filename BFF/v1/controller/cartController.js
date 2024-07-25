import axios from 'axios';
import logger from '../config/logger.js';
import CartService from '../service/cartService.js';

const cartService = new CartService();

class CartController{    
    async getCarts(req,res){
        try {
            const carts = await cartService.getCarts();
            res.status(200).json(carts)
        } catch (error) {
            logger.error("Cart controller | Exception occured: ",error);
            res.status(500).json(axios.HttpStatusCode.InternalServerError)
        }
    }

    async createCart(req,res){
        try{
            const newCart = await cartService.createCart(req.body);
            res.status(201).json(newCart);
        } catch(error){
            logger.error("Cart controller | Exception occured: ",error.cause);
            res.status(500).json(axios.HttpStatusCode.InternalServerError)
        }
    }
    
    async getCartById(req,res){
        try{
            const cart = await cartService.getCartById(req.params.id);
            res.status(200).json(cart);
        } catch(error){
            logger.error("Cart controller | Exception occured: ",error.cause);
            res.status(500).json(axios.HttpStatusCode.InternalServerError)
        }
    }

    async deleteCartById(req,res){
        try{
            await cartService.deleteCartById(req.params.id);
            res.status(204).json();
        } catch(error){
            logger.error("Cart controller | Exception occured: ",error.cause);
            res.status(500).json(axios.HttpStatusCode.InternalServerError)
        }
    }

    async updateCart(req,res){
        try{
            const newCart = await cartService.updateCart(req.params.id,req.body);
            res.status(200).json(newCart);
        } catch(error){
            logger.error("Cart controller | Exception occured: ",error.cause);
            res.status(500).json(axios.HttpStatusCode.InternalServerError)
        }
    }
}

export default CartController;