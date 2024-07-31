import axios from 'axios';
import logger from '../config/logger.js';
import config from '../config/conf.js';
import BadRequestException from '../exceptions/BadRequestError.js';
import NotFoundException from '../exceptions/NotFoundError.js';
import BffError from '../exceptions/BffError.js';

class CartService{
    async getCarts(){
        return await axios.get(`${config.baseUrlPrefix}/carts`)
        .then((response) => {
            logger.info("Cart service | Got cart details");
            return response.data;
        })
        .catch((error)=>{
            logger.error("Cart service | Exception occured: ",error);
            throw new BffError();
        });
    }

    async createCart(cart){
        return await axios.post(`${config.baseUrlPrefix}/carts`,cart)
        .then((response) => {
            logger.info("Cart service | Created cart");
            return response.data;
        })
        .catch((error)=>{
            switch(error.status){
                case 400:
                    logger.error("Cart service | Bad request");
                    throw new BadRequestException();
                default:
                    logger.error("Cart service | Exception occured: ",error);
                    throw new BffError();
            }
        });
    }

    async getCartById(cartId){
        return await axios.get(`${config.baseUrlPrefix}/carts/${cartId}`)
        .then((response)=>{
            logger.info("Cart service | Got cart details");
            return response.data;
        })
        .catch((error)=>{
            switch(error.status){
                case 400:
                    logger.error("Cart service | Bad request");
                    throw new BadRequestException();
                case 404:
                    logger.error("Cart service | Not found");
                    throw new NotFoundException();
                default:
                    logger.error("Cart service | Exception occured: ",error);
                    throw new BffError();
            }
        });
    }

    async deleteCartById(cartId){
        return await axios.delete(`${config.baseUrlPrefix}/carts/${cartId}`)
        .then((response)=>{
            logger.info("Cart service | Successfully deleted");
            return response.data;
        })
        .catch((error)=>{
            switch(error.status){
                case 400:
                    logger.error("Cart service | Bad request");
                    throw new BadRequestException();
                case 404:
                    logger.error("Cart service | Not found");
                    throw new NotFoundException();
                default:
                    logger.error("Cart service | Exception occured: ",error);
                    throw new BffError();
            }
        });
    }

    async updateCart(cartId, cartContents){
        return await axios.patch(`${config.baseUrlPrefix}/carts/${cartId}`,cartContents)
        .then((response)=>{
            logger.info("Cart service | Successfully updated");
            return response.data;
        })
        .catch((error)=>{
            switch(error.status){
                case 400:
                    logger.error("Cart service | Bad request");
                    throw new BadRequestException();
                case 404:
                    logger.error("Cart service | Not found");
                    throw new NotFoundException();
                default:
                    logger.error("Cart service | Exception occured: ",error);
                    throw new BffError();
            }
        });
    }
}

export default CartService;