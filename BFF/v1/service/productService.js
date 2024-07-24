const axios = require('axios');
const logger = require('../config/logger');
const { response } = require('express');
const { baseUrl } = require('../constants/constants')

class ProductService{
    async getProducts(){
        return await axios.get(`${baseUrl}/products`)
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
        return await axios.post(`${baseUrl}/products`,product)
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
        return await axios.get(`${baseUrl}/products/${productId}`)
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
        return await axios.delete(`${baseUrl}/products/${productId}`)
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
        return await axios.patch(`${baseUrl}/products/${productId}`,product)
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
        return await axios.get(`${baseUrl}/products/categories`)
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

module.exports = ProductService;