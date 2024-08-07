import { Router } from 'express';
import productController from '../controller/productController.js';

class ProductRouter{
    constructor(){
        this.router = Router();
        this.controller = new productController();
        this.initializeRoutes();
    }
    
    initializeRoutes(){
    this.router.get('/', this.controller.getProducts);
    this.router.post('/', this.controller.createProduct);
    this.router.get('/:id', this.controller.getProductById);
    this.router.delete('/:id', this.controller.deleteProductById);
    this.router.put('/:id', this.controller.updateProduct);
    this.router.get('/categories',this.controller.getProductCategories);
    }

    getRouter(){
        return this.router;
    }
}

export default ProductRouter;