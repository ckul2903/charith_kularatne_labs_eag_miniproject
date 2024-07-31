import axios from 'axios';
import logger from '../config/logger.js';
import config from '../config/conf.js';

class ProductService{
    async getProducts(){
        return await axios.get(`${config.baseUrlPrefix}/products`)
        .then((response) => {
            logger.info("Product service | Got product details");
            return response.data;
        })
        .catch((error)=>{
            logger.error("Product service | Exception occured: ",error.cause);
            throw error;
        });
    }

    async addNewProduct(product){
        return await axios.post(`${config.baseUrlPrefix}/products`,product)
        .then((response) => {
            logger.info("Product service | Created product");
            return response.data;
        })
        .catch((error)=>{
            logger.error("Product service | Exception occured: ",error.cause);
            throw error;
        });
    }

    async getProductById(productId){
        return await axios.get(`${config.baseUrlPrefix}/products/${productId}`)
        .then((response)=>{
            logger.info("Product service | Got product details");
            return response.data;
        })
        .catch((error)=>{
            logger.error("Product service | Exception occured: ",error.cause);
            throw error;
        });
    }

    async removeProduct(productId){
        return await axios.delete(`${config.baseUrlPrefix}/products/${productId}`)
        .then((response)=>{
            logger.info("Product service | Successfully deleted");
            return response.data;
        })
        .catch((error)=>{
            logger.error("Product service | Exception occured: ",error.cause);
            throw error;
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
            logger.error("Product service | Exception occured: ",error.cause);
            throw error;
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