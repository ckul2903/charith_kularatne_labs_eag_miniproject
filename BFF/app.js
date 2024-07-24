const express = require('express');
const { json } = require('body-parser');
const CartRouter = require('./v1/routers/cartRouter');
const ProductRouter = require('./v1/routers/productRouter');

const app = express();
const cartRouter = new CartRouter()
const productRouter = new ProductRouter();

app.use(express.json());
app.use('/api/v1/carts', cartRouter.getRouter());
app.use('/api/v1/products', productRouter.getRouter());

app.listen(3000, ()=>{
    console.log('Server started on port 3000');
})
