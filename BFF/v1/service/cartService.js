const axios = require('axios');
const logger = require('../config/logger');
const { response } = require('express');
const { baseUrl } = require('../constants/constants')

class CartService{
    async getCarts(){
        return await axios.get(`${baseUrl}/carts`)
        .then((response) => {
            logger.info("Cart service | Got cart details");
            return response.data;
        })
        .catch((error)=>{
            logger.error("Cart service | Exception occured: ",error.cause);
            throw error;
        });
    }

    async createCart(cart){
        return await axios.post(`${baseUrl}/carts`,cart)
        .then((response) => {
            logger.info("Cart service | Created cart");
            return response.data;
        })
        .catch((error)=>{
            logger.error("Cart service | Exception occured: ",error.cause);
            throw error;
        });
    }

    async getCartById(cartId){
        return await axios.get(`${baseUrl}/carts/${cartId}`)
        .then((response)=>{
            logger.info("Cart service | Got cart details");
            return response.data;
        })
        .catch((error)=>{
            switch (error.status) {
                case 404:
                    logger.error("NOT FOUND");
                    break;
                case 400:
                    logger.error("BAD REQUEST");
                    break
                default:
                    logger.error("INTERNAL ERROR");
                    break;
            }
            logger.error("Cart service | Exception occured: ",error.cause);
            throw error;
        });
    }

    async deleteCartById(cartId){
        return await axios.delete(`${baseUrl}/carts/${cartId}`)
        .then((response)=>{
            logger.info("Cart service | Successfully deleted");
            return response.data;
        })
        .catch((error)=>{
            logger.error("Cart service | Exception occured: ",error.cause);
            throw error;
        });
    }

    async updateCart(cartId, cartContents){
        return await axios.patch(`${baseUrl}/carts/${cartId}`,cartContents)
        .then((response)=>{
            logger.info("Cart service | Successfully updated");
            return response.data;
        })
        .catch((error)=>{
            logger.error("Cart service | Exception occured: ",error.cause);
            throw error;
        });
    }
}

module.exports = CartService;