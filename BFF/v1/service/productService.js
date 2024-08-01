import axios from 'axios';
import logger from '../config/logger.js';
import config from '../config/conf.js';
import BadRequestException from '../exceptions/BadRequestError.js';
import NotFoundException from '../exceptions/NotFoundError.js';
import BffError from '../exceptions/BffError.js';
import { productApi } from '../api/apiinstances.js';
import { httpMethods } from '../config/constants.js';

class ProductService{
    async getProducts(){
        return await productApi.request({
            method:httpMethods.GET
        })
        .then((response) => {
            logger.info("Product service | Got product details");
            return response.data;
        })
        .catch((error)=>{
            logger.error("Product service | Exception occured: ",error.cause);
            throw new BffError();
        });
    }

    async addNewProduct(product){
        return await productApi.request({
            method:httpMethods.GET,
            data:product
        })
        .then((response) => {
            logger.info("Product service | Created product");
            return response.data;
        })
        .catch((error)=>{
            switch(error.status){
                case 400:
                    logger.error("Product service | Bad request");
                    throw new BadRequestException();
                default:
                    logger.error("Product service | Exception occured: ",error.cause);
                    throw new BffError();
            }
        });
    }

    async getProductById(productId){
        return await productApi.request({
            url:`/${productId}`,
            method:httpMethods.GET,
        })
        .then((response)=>{
            logger.info("Product service | Got product details");
            return response.data;
        })
        .catch((error)=>{
            switch(error.status){
                case 400:
                    logger.error("Product service | Bad request");
                    throw new BadRequestException();
                case 404:
                        logger.error("Product service | Product not found");
                        throw new NotFoundException()
                default:
                    logger.error("Product service | Exception occured: ",error.cause);
                    throw new BffError();
            }
        });
    }

    async removeProduct(productId){
        return await productApi.request({
            url:`/${productId}`,
            method:httpMethods.DELETE,
        })
        .then((response)=>{
            logger.info("Product service | Successfully deleted");
            return response.data;
        })
        .catch((error)=>{
            switch(error.status){
                case 400:
                    logger.error("Product service | Bad request");
                    throw new BadRequestException();
                case 404:
                        logger.error("Product service | Product not found");
                        throw new NotFoundException()
                default:
                    logger.error("Product service | Exception occured: ",error.cause);
                    throw new BffError();
            }
        });
    }

    async updateProduct(product){
        productId = product.productId
        return await productApi.request({
            url:`/${productId}`,
            method:httpMethods.PATCH,
            data:product
        })
        .then((response)=>{
            logger.info("Product service | Successfully deleted");
            return response.data;
        })
        .catch((error)=>{
            switch(error.status){
                case 400:
                    logger.error("Product service | Bad request");
                    throw new BadRequestException();
                case 404:
                        logger.error("Product service | Product not found");
                        throw new NotFoundException()
                default:
                    logger.error("Product service | Exception occured: ",error.cause);
                    throw new BffError();
            }
        });
    }

    async getProductCategories(){
        return await productApi.request({
            url:`/categories`,
            method:httpMethods.GET,
        })
        .then((response) => {
            logger.info("recieved data from peer");
            return response.data;
        })
        .catch((error)=>{
            logger.error("Product service | Exception occured: ",error.cause);
            throw error;
        });
    }
}

export default ProductService;