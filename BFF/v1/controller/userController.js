import logger from '../config/logger.js';
import UserService from '../service/userService.js';
import AuthService from '../service/authService.js';
import Roles from '../config/userRoles.js'

const userService = new UserService();
const authService = new AuthService();

class UserController{    
    async getUsers(req,res){
        try {
            const users = await userService.getUsers();
            res.status(200).json(users)
        } catch (error) {
            logger.error("User controller | ", error);
            res.status(error.statusCode).json(error.cause);
        }
    }

    async createUser(req,res){
        try{
            authService.registerUser(req.body.username,req.body.password, Roles.admin);

            const createdUser = await userService.createUser(req.body);
            res.status(201).json(createdUser);
        } catch(error){
            logger.error("User controller | ",error);
            res.status(error.statusCode).json(error.cause);
        }
    }
    
    async getUserById(req,res){
        try{
            const user = await userService.getUserById(req.params.id);
            res.status(200).json(user);
        } catch(error){
            logger.error("User controller | ",error);
            res.status(error.statusCode).json(error.cause);
        }
    }

    async deleteUserById(req,res){
        try{
            await userService.removeUser(req.params.id);
            res.status(204).json();
        } catch(error){
            logger.error("User controller | ",error);
            res.status(error.statusCode).json(error.cause);
        }
    }

    async updateUser(req,res){
        try{
            const updatedUser = await userService.updateUser(req.params.id,req.body);
            res.status(200).json(updatedUser);
        } catch(error){
            logger.error("User controller | ",error);
            res.status(error.statusCode).json(error.cause);
        }
    }
}

export default UserController;