const express = require('express');
const axios = require('axios');

const cartRouter = express.Router();

cartRouter.get( '/', 
    async (req,res) => {
        let cartData;
        cartData = await axios.get('http://localhost:8080/api/v1/carts')
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            console.error('Error fetching cart data:', error);
            return Promise.reject({error:"error"});
        });

        res.send(cartData);
    });

module.exports = cartRouter;