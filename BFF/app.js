import express, { json } from 'express';
import config from './v1/config/conf.js';
import CartRouter from './v1/routers/cartRouter.js';
import ProductRouter from './v1/routers/productRouter.js';
import UserRouter from './v1/routers/userRouter.js';

const app = express();
const cartRouter = new CartRouter()
const productRouter = new ProductRouter();
const userRouter = new UserRouter();

app.use(json());
app.use('/api/v1/carts', cartRouter.getRouter());
app.use('/api/v1/products', productRouter.getRouter());
app.use('/api/v1/users', userRouter.getRouter());

app.listen(config.port, ()=>{
    console.log('Server started on port',config.port);
})
