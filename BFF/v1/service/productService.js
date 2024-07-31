import axios from 'axios';
import logger from '../config/logger.js';
import config from '../config/conf.js';
import BadRequestException from '../exceptions/BadRequestError.js';
import NotFoundException from '../exceptions/NotFoundError.js';
import BffError from '../exceptions/BffError.js';

class ProductService{
    async getProducts(){
        return await axios.get(`${config.baseUrlPrefix}/products`)
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
        return await axios.post(`${config.baseUrlPrefix}/products`,product)
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
        return await axios.get(`${config.baseUrlPrefix}/products/${productId}`)
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
        return await axios.delete(`${config.baseUrlPrefix}/products/${productId}`)
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
        return await axios.patch(`${config.baseUrlPrefix}/products/${productId}`,product)
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
        return await axios.get(`${config.baseUrlPrefix}/products/categories`)
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