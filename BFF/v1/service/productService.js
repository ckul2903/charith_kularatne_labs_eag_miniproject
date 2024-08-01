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
            logger.info("Product service | Get Products | Got product details");
            return response.data;
        })
        .catch((error)=>{
            logger.error("Product service | Get Products | ",error);
            throw new BffError("error getting product list");
        });
    }

    async addNewProduct(product){
        return await productApi.request({
            method:httpMethods.GET,
            data:product
        })
        .then((response) => {
            logger.info("Product service | Create Products | Created product");
            return response.data;
        })
        .catch((error)=>{
            switch(error.status){
                case 400:
                    logger.error("Product service | Create Products | Bad request");
                    throw new BadRequestException();
                default:
                    logger.error("Product service | Create Products | ",error);
                    throw new BffError("error adding product");
            }
        });
    }

    async getProductById(productId){
        return await productApi.request({
            url:`/${productId}`,
            method:httpMethods.GET,
        })
        .then((response)=>{
            logger.info("Product service | Get Product by ID | Got product details");
            return response.data;
        })
        .catch((error)=>{
            switch(error.status){
                case 400:
                    logger.error("Product service | Get Product by ID | Bad request");
                    throw new BadRequestException();
                case 404:
                        logger.error("Product service | Get Product by ID | Product not found");
                        throw new NotFoundException()
                default:
                    logger.error("Product service | Get Product by ID | ",error);
                    throw new BffError("error getting product "+productId);
            }
        });
    }

    async removeProduct(productId){
        return await productApi.request({
            url:`/${productId}`,
            method:httpMethods.DELETE,
        })
        .then((response)=>{
            logger.info("Product service | Delete Products | Successfully deleted");
            return response.data;
        })
        .catch((error)=>{
            switch(error.status){
                case 400:
                    logger.error("Product service | Delete Products | Bad request");
                    throw new BadRequestException();
                case 404:
                        logger.error("Product service | Delete Products | Product not found");
                        throw new NotFoundException()
                default:
                    logger.error("Product service | Delete Products | ",error);
                    throw new BffError("error deleting product "+productId);
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
            logger.info("Product service | Update Products | Successfully deleted");
            return response.data;
        })
        .catch((error)=>{
            switch(error.status){
                case 400:
                    logger.error("Product service | Update Products | Bad request");
                    throw new BadRequestException();
                case 404:
                        logger.error("Product service | Update Products | Product not found");
                        throw new NotFoundException()
                default:
                    logger.error("Product service | Update Products | ",error);
                    throw new BffError("error updating product "+productId);
            }
        });
    }

    async getProductCategories(){
        return await productApi.request({
            url:`/categories`,
            method:httpMethods.GET,
        })
        .then((response) => {
            logger.info("Product service | Get Product Categories | Recieved data");
            return response.data;
        })
        .catch((error)=>{
            logger.error("Product service | Get Product Categories | ",error);
            throw new BffError("error getting category list");
        });
    }
}

export default ProductService;