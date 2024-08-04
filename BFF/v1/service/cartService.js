import axios from 'axios';
import logger from '../config/logger.js';
import config from '../config/conf.js';
import BadRequestException from '../exceptions/BadRequestError.js';
import NotFoundException from '../exceptions/NotFoundError.js';
import BffError from '../exceptions/BffError.js';
import { cartApi } from '../api/apiinstances.js';
import { httpMethods } from '../config/constants.js';

class CartService{
    getCarts(){
        return new Promise((resolve, reject) => {
            cartApi.request({
                method:httpMethods.GET,
            })
            .then((response) => {
                logger.info("Cart service | Get Carts | Got cart details");
                resolve(response.data);
            })
            .catch((error)=>{
                logger.error("Cart service | Get Carts | Exception occured: ",error);
                reject(new BffError("error getting cart list"));
            });
        });
    }

    async createCart(cart){
        return new Promise((resolve, reject) => {
            cartApi.request({
                method:httpMethods.POST,
                data:cart,
            })
            .then((response) => {
                logger.info("Cart service | Create Carts | Created cart");
                resolve(response.data);
            })
            .catch((error)=>{
                switch(error.response.status){
                    case 400:
                        logger.error("Cart service | Create Carts | Bad request");
                        reject(new BadRequestException());
                        break;
                    default:
                        logger.error("Cart service | Create Carts | ",error);
                        reject(new BffError("error creating cart"));
                }
            });
        });
    }

    async getCartById(cartId){
        return new Promise((resolve, reject) => {
            cartApi.request({
                url:`/${cartId}`,
                method:httpMethods.GET,
            })
            .then((response)=>{
                logger.info("Cart service | Get Cart by ID | Got cart details");
                resolve(response.data);
            })
            .catch((error)=>{
                switch(error.response.status){
                    case 400:
                        logger.error("Cart service | Get Cart by ID | Bad request");
                        reject(new BadRequestException());
                        break;
                    case 404:
                        logger.error("Cart service | Get Cart by ID | Not found");
                        reject(new NotFoundException("Cart ",cartId));
                        break;
                    default:
                        logger.error("Cart service | Get Cart by ID | ",error);
                        reject(new BffError("error getting cart "+cartId));
                }
            });
        });
    }

    deleteCartById(cartId){
        return new Promise((resolve, reject) => {
            cartApi.request({
                url:`/${cartId}`,
                method:httpMethods.DELETE,
            })
            .then((response)=>{
                logger.info("Cart service | Delete Cart | Successfully deleted");
                resolve(response.data);
            })
            .catch((error)=>{
                switch(error.response.status){
                    case 400:
                        logger.error("Cart service | Delete Cart | Bad request");
                        reject(new BadRequestException());
                        break;
                    case 404:
                        logger.error("Cart service | Delete Cart | Not found");
                        reject(new NotFoundException());
                        break;
                    default:
                        logger.error("Cart service | Delete Cart | Exception occured: ",error);
                        reject(new BffError("error deleting cart "+cartId));
                }
            });
        });
    }

    async updateCart(cartId, cartContents){
        return new Promise((resolve, reject) => {
            cartApi.request({
                url:`/${cartId}`,
                method:httpMethods.PATCH,
                data:cartContents,
            })
            .then((response)=>{
                logger.info("Cart service | Update Cart | Successfully updated");
                resolve(response.data);
            })
            .catch((error)=>{
                switch(error.response.status){
                    case 400:
                        logger.error("Cart service | Update Cart | Bad request");
                        reject(new BadRequestException());
                        break;
                    case 404:
                        logger.error("Cart service | Update Cart | Not found");
                        reject(new NotFoundException(`cart ${cartId}`));
                        break;
                    default:
                        logger.error("Cart service | Update Cart | Exception occured: ",error);
                        reject(new BffError("error updating cart "+cartId));
                }
            });
        });
    }
}

export default CartService;