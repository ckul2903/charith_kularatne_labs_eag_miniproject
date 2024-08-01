import axios from 'axios';
import logger from '../config/logger.js';
import config from '../config/conf.js';
import BadRequestException from '../exceptions/BadRequestError.js';
import NotFoundException from '../exceptions/NotFoundError.js';
import BffError from '../exceptions/BffError.js';
import { cartApi } from '../api/apiinstances.js';
import { httpMethods } from '../config/constants.js';

class CartService{
    async getCarts(){
        return await cartApi.request({
            method:httpMethods.GET,
        })
        .then((response) => {
            logger.info("Cart service | Get Carts | Got cart details");
            return response.data;
        })
        .catch((error)=>{
            logger.error("Cart service | Get Carts | Exception occured: ",error);
            throw new BffError("error getting cart list");
        });
    }

    async createCart(cart){
        return await cartApi.request({
            method:httpMethods.POST,
            data:cart,
        })
        .then((response) => {
            logger.info("Cart service | Create Carts | Created cart");
            return response.data;
        })
        .catch((error)=>{
            switch(error.status){
                case 400:
                    logger.error("Cart service | Create Carts | Bad request");
                    throw new BadRequestException();
                default:
                    logger.error("Cart service | Create Carts | ",error);
                    throw new BffError("error creating cart");
            }
        });
    }

    async getCartById(cartId){
        return await cartApi.request({
            url:`/${cartId}`,
            method:httpMethods.GET,
        })
        .then((response)=>{
            logger.info("Cart service | Get Cart by ID | Got cart details");
            return response.data;
        })
        .catch((error)=>{
            switch(error.status){
                case 400:
                    logger.error("Cart service | Get Cart by ID | Bad request");
                    throw new BadRequestException();
                case 404:
                    logger.error("Cart service | Get Cart by ID | Not found");
                    throw new NotFoundException();
                default:
                    logger.error("Cart service | Get Cart by ID | ",error);
                    throw new BffError("error getting cart "+cartId);
            }
        });
    }

    async deleteCartById(cartId){
        return await await cartApi.request({
            url:`/${cartId}`,
            method:httpMethods.DELETE,
        })
        .then((response)=>{
            logger.info("Cart service | Delete Cart | Successfully deleted");
            return response.data;
        })
        .catch((error)=>{
            switch(error.status){
                case 400:
                    logger.error("Cart service | Delete Cart | Bad request");
                    throw new BadRequestException();
                case 404:
                    logger.error("Cart service | Delete Cart | Not found");
                    throw new NotFoundException();
                default:
                    logger.error("Cart service | Delete Cart | Exception occured: ",error);
                    throw new BffError("error deleting cart "+cartId);
            }
        });
    }

    async updateCart(cartId, cartContents){
        return await axios.patch(`${config.baseUrlPrefix}/carts/${cartId}`,cartContents)
        .then((response)=>{
            logger.info("Cart service | Update Cart | Successfully updated");
            return response.data;
        })
        .catch((error)=>{
            switch(error.status){
                case 400:
                    logger.error("Cart service | Update Cart | Bad request");
                    throw new BadRequestException();
                case 404:
                    logger.error("Cart service | Update Cart | Not found");
                    throw new NotFoundException();
                default:
                    logger.error("Cart service | Update Cart | Exception occured: ",error);
                    throw new BffError("error updating cart "+cartId);
            }
        });
    }
}

export default CartService;