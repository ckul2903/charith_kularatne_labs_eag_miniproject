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
            logger.info("Product service | Get Products | Got product details");
            return response.data;
        })
        .catch((error)=>{
            logger.error("Product service | Get Products | ",error);
            throw new BffError("error getting product list");
        });
    }

    async addNewProduct(product){
        return await axios.post(`${config.baseUrlPrefix}/products`,product)
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
        return await axios.get(`${config.baseUrlPrefix}/products/${productId}`)
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
        return await axios.delete(`${config.baseUrlPrefix}/products/${productId}`)
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
        return await axios.patch(`${config.baseUrlPrefix}/products/${productId}`,product)
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
        return await axios.get(`${config.baseUrlPrefix}/products/categories`)
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