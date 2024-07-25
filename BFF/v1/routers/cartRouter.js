import { Router } from 'express';
import cartController from '../controller/cartController.js';

class CartRouter{
    constructor(){
        this.router = Router();
        this.controller = new cartController();
        this.initializeRoutes();
    }
    
    initializeRoutes(){
    this.router.get('/', this.controller.getCarts);
    this.router.post('/', this.controller.createCart);
    this.router.get('/:id', this.controller.getCartById);
    this.router.delete('/:id', this.controller.deleteCartById);
    this.router.patch('/:id', this.controller.updateCart);
    }

    getRouter(){
        return this.router;
    }
}

export default CartRouter;