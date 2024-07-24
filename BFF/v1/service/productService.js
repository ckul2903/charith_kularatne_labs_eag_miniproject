const axios = require('axios');
const { response } = require('express');
const { baseUrl } = require('../constants/constants')

class ProductService{
    async getProducts(){
        return await axios.get(`${baseUrl}/products`)
        .then((response) => {
            console.log("recieved data from peer");
            return response.data;
        })
        .catch((error)=>{
            console.error("service | error | get");
            throw error;
        });
    }

    async addNewProduct(product){
        return await axios.post(`${baseUrl}/products`,product)
        .then((response) => {
            console.log("created entry");
            return response.data;
        })
        .catch((error)=>{
            console.error("service | error | create");
            throw error;
        });
    }

    async getProductById(productId){
        return await axios.get(`${baseUrl}/products/${productId}`)
        .then((response)=>{
            console.log("received data from peer");
            return response.data;
        })
        .catch((error)=>{
            console.error("service | error | get by id");
            throw error;
        });
    }

    async removeProduct(productId){
        return await axios.delete(`${baseUrl}/products/${productId}`)
        .then((response)=>{
            console.log("delete successful");
            return response.data;
        })
        .catch((error)=>{
            console.error("service | error | delete by id");
            throw error;
        });
    }

    async updateProduct(product){
        productId = product.productId
        return await axios.patch(`${baseUrl}/products/${productId}`,product)
        .then((response)=>{
            console.log("delete successful");
            return response.data;
        })
        .catch((error)=>{
            console.error("service | error | delete by id");
            throw error;
        });
    }

    async getProductCategories(){
        return await axios.get(`${baseUrl}/products/categories`)
        .then((response) => {
            console.log("recieved data from peer");
            return response.data;
        })
        .catch((error)=>{
            console.error("service | error | get");
            throw error;
        });
    }
}

module.exports = ProductService;