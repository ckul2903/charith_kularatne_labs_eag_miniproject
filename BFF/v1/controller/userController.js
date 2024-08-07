import logger from '../config/logger.js';
import UserService from '../service/userService.js';
import AuthService from '../service/authService.js';
import {roles} from '../config/constants.js'
import BffError from '../exceptions/BffError.js';

const userService = new UserService();
const authService = new AuthService();

class UserController{    
    async getUsers(req,res){
        try {
            const users = await userService.getUsers();
            res.status(200).json(users)
        } catch (error) {
            logger.error("User Controller | Get user | ", error);
            res.status(error.statusCode).json(error.cause);
        }
    }

    async createUser(req,res){
        const {username,password} = req.body;
        try{
            logger.info("User Controller | Create user | Registering user in cognito. name: ",username)
            const cognitoUser = await authService.registerUser(username,password, roles.admin);
            
            if(cognitoUser){
                logger.cognitoUser
                const localUser = await userService.createUser(
                    {
                        "userId":cognitoUser.userSub,
                        "username":username
                    }
                );
                res.status(201).json(localUser);
            }else{
                throw new BffError("User Controller | Create user | Failed to locally create user.")
            }
        } catch(error){
            logger.error("User Controller | Create user | ",error);
            res.status(error.statusCode).json(error.cause);
        }
    }

    async authenticateUser(req,res){
        const {username,password} = req.body;
        const {id} = req.params; 
        try{
            logger.info("User Controller | Authenticate user | Checking if user exists. ID: ",id);
            await userService.getUserById(id);
            logger.info("User Controller | Authenticate user | Authenticating user id:",id)            
            const credentials = await authService.authenticateUser(username,password);
            res.status(200).json(credentials);
        } catch(error){
            logger.error("User Controller | Authenticate user | ",error);
            res.status(error.statusCode).json(error.cause);
        }
    }
    
    async getUserById(req,res){
        try{
            const user = await userService.getUserById(req.params.id);
            logger.info("User Controller | Got user ",user);
            res.status(200).json(user);
        } catch(error){
            logger.error("User Controller | Get user by ID | ",error);
            res.status(error.statusCode).json(error.cause);
        }
    }

    async deleteUserById(req,res){      
        const {id} = req.params;
        try{
            logger.info("User Controller | Getting user to delete", id);
            const localUser = await userService.getUserById(id);
            logger.info("User Controller | Deleting user", localUser.data.userId);
            await authService.deleteUser(localUser.data.username);
            logger.info("User Controller | Cognito deletion success. Deleting locally.");
            await userService.removeUser(id);
            logger.info("User Controller | Delete user by ID successful.");
            res.status(204).json();
        } catch(error){
            logger.error("User Controller | Delete user by ID | ",error);
            res.status(error.statusCode).json(error.cause);
        }
    }

    async updateUser(req,res){
        try{
            const updatedUser = await userService.updateUser(req.params.id,req.body);
            res.status(200).json(updatedUser);
        } catch(error){
            logger.error("User Controller | Update user | ",error);
            res.status(error.statusCode).json(error.cause);
        }
    }
}

export default UserController;