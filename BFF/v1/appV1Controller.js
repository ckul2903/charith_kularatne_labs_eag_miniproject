const express = require('express');
const axios = require('axios');
const cartRouter = require('./routers/cartRouter');

const cartV1Controller = express.Router();

cartV1Controller.use( '/carts', cartRouter );

module.exports = cartV1Controller;