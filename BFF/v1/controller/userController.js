import axios from 'axios';
import logger from '../config/logger.js';
import UserService from '../service/userService.js';
import AuthService from '../service/authService.js';

const userService = new UserService();
const authService = new AuthService();

class UserController{    
    async getUsers(req,res){
        try {
            const users = await userService.getUsers();
            res.status(200).json(users)
        } catch (error) {
            logger.error("User controller | Exception occured: ",error.cause);
            res.status(500).json(axios.HttpStatusCode.InternalServerError)
        }
    }

    async createUser(req,res){
        try{
            authService.registerUser(req.body.username,req.body.password);

            const createdUser = await userService.addNewUser(req.body);
            res.status(201).json(createdUser);
        } catch(error){
            logger.error("User controller | Exception occured: ",error.cause);
            res.status(500).json(axios.HttpStatusCode.InternalServerError)
        }
    }
    
    async getUserById(req,res){
        try{
            const user = await userService.getUserById(req.params.id);
            res.status(200).json(user);
        } catch(error){
            logger.error("User controller | Exception occured: ",error.cause);
            res.status(500).json(axios.HttpStatusCode.InternalServerError)
        }
    }

    async deleteUserById(req,res){
        try{
            await userService.removeUser(req.params.id);
            res.status(204).json();
        } catch(error){
            logger.error("User controller | Exception occured: ",error.cause);
            res.status(500).json(axios.HttpStatusCode.InternalServerError)
        }
    }

    async updateUser(req,res){
        try{
            const updatedUser = await userService.updateUser(req.params.id,req.body);
            res.status(200).json(updatedUser);
        } catch(error){
            logger.error("User controller | Exception occured: ",error.cause);
            res.status(500).json(axios.HttpStatusCode.InternalServerError)
        }
    }
}

export default UserController;