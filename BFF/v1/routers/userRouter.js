import { Router } from 'express';
import userController from '../controller/userController.js';

class UserRouter{
    constructor(){
        this.router = Router();
        this.controller = new userController();
        this.initializeRoutes();
    }
    
    initializeRoutes(){
        this.router.get('/', this.controller.getUsers);
        this.router.post('/', this.controller.createUser);
        this.router.get('/:id', this.controller.getUserById);
        this.router.delete('/:id', this.controller.deleteUserById);
        this.router.put('/:id', this.controller.updateUser);
        this.router.post('/:id/authenticate',this.controller.authenticateUser);
    }

    getRouter(){
        return this.router;
    }
}

export default UserRouter;