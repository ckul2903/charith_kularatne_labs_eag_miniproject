const errorResponses = require('../exception/errorResponses');
const logger = require('../config/logger');
const UserService = require('../service/userService')

const userService = new UserService();

class UserController{    
    async getUsers(req,res){
        try {
            const users = await userService.getUsers();
            res.status(200).json(users)
        } catch (error) {
            logger.error("User controller | Exception occured: ",error.cause);
            res.status(500).json(errorResponses.INTERNAL_SERVER_ERROR)
        }
    }

    async createUser(req,res){
        try{
            const newUser = await userService.addNewUser(req.body);
            res.status(201).json(newUser);
        } catch(error){
            logger.error("User controller | Exception occured: ",error.cause);
            res.status(500).json(errorResponses.INTERNAL_SERVER_ERROR)
        } 
    }
    
    async getUserById(req,res){
        try{
            const user = await userService.getUserById(req.params.id);
            res.status(200).json(user);
        } catch(error){
            logger.error("User controller | Exception occured: ",error.cause);
            res.status(500).json(errorResponses.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteUserById(req,res){
        try{
            await userService.removeUser(req.params.id);
            res.status(204).json();
        } catch(error){
            logger.error("User controller | Exception occured: ",error.cause);
            res.status(500).json(errorResponses.INTERNAL_SERVER_ERROR)
        }
    }

    async updateUser(req,res){
        try{
            const newUser = await userService.updateUser(req.params.id,req.body);
            res.status(200).json(newUser);
        } catch(error){
            logger.error("User controller | Exception occured: ",error.cause);
            res.status(500).json(errorResponses.INTERNAL_SERVER_ERROR)
        }
    }
}

module.exports = UserController;