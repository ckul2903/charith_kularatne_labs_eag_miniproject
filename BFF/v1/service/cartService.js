const axios = require('axios');
const { response } = require('express');
const { baseUrl } = require('../constants/constants')

class CartService{
    async getCarts(){
        return await axios.get(`${baseUrl}/carts`)
        .then((response) => {
            console.log("recieved data from peer");
            return response.data;
        })
        .catch((error)=>{
            console.error("service | error | get");
            throw error;
        });
    }

    async createCart(cart){
        return await axios.post(`${baseUrl}/carts`,cart)
        .then((response) => {
            console.log("created entry");
            return response.data;
        })
        .catch((error)=>{
            console.error("service | error | create");
            throw error;
        });
    }

    async getCartById(cartId){
        return await axios.get(`${baseUrl}/carts/${cartId}`)
        .then((response)=>{
            console.log("received data from peer");
            return response.data;
        })
        .catch((error)=>{
            switch (error.status) {
                case 404:
                    console.error("NOT FOUND");
                    break;
                case 400:
                    console.error("BAD REQUEST");
                    break
                default:
                    console.error("INTERNAL ERROR");
                    break;
            }
            console.error("service | error | get by id");
            throw error;
        });
    }

    async deleteCartById(cartId){
        return await axios.delete(`${baseUrl}/carts/${cartId}`)
        .then((response)=>{
            console.log("delete successful");
            return response.data;
        })
        .catch((error)=>{
            console.error("service | error | delete by id");
            throw error;
        });
    }

    async updateCart(cartId, cartContents){
        return await axios.patch(`${baseUrl}/carts/${cartId}`,cartContents)
        .then((response)=>{
            console.log("delete successful");
            return response.data;
        })
        .catch((error)=>{
            console.error("service | error | delete by id");
            throw error;
        });
    }
}

module.exports = CartService;