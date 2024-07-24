const express = require('express');
const userController = require('../controller/userController')

class UserRouter{
    constructor(){
        this.router = express.Router();
        this.controller = new userController();
        this.initializeRoutes();
    }
    
    initializeRoutes(){
    this.router.get('/', this.controller.getUsers);
    this.router.post('/', this.controller.createUser);
    this.router.get('/:id', this.controller.getUserById);
    this.router.delete('/:id', this.controller.deleteUserById);
    this.router.put('/:id', this.controller.updateUser);
    }

    getRouter(){
        return this.router;
    }
}

module.exports = UserRouter;