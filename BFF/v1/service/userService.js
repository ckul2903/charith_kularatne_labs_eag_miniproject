import axios from 'axios';
import logger from '../config/logger.js';
import config from '../config/conf.js';
import BadRequestException from '../exceptions/BadRequestError.js';
import NotFoundException from '../exceptions/NotFoundError.js';
import BffError from '../exceptions/BffError.js';
import { userApi } from '../api/apiinstances.js';
import { httpMethods } from '../config/constants.js';

class UserService{
    async getUsers(){
        return await userApi.request({
            method:httpMethods.GET
        })
        .then((response) => {
            logger.info("User service | Get User |Got user details");
            return response.data;
        })
        .catch((error)=>{
            logger.error("User service | Get User | ",error);
            throw new BffError("error getting user list");
        });
    }

    async createUser(user){
        return await userApi.request({
            method:httpMethods.POST,
            data:user,
        })
        .then((response) => {
            logger.info("User service | Create User | Created user");
            return response.data;
        })
        .catch((error)=>{
            switch(error.status){
                case 400:
                    logger.error("User service | Create User | Bad request");
                    throw new BadRequestException();
                default:
                    logger.error("User service | Create User | Exception occured: ",error);
                    throw new BffError("error creating user");
            }
        });
    }

    async getUserById(userId){
        return await userApi.request({
            url:`/${userId}`,
            method:httpMethods.GET,
        })
        .then((response)=>{
            logger.info("User service | Get User by ID | Got user details");
            return response.data;
        })
        .catch((error)=>{
            switch(error.status){
                case 400:
                    logger.error("User service | Get User by ID |Bad request");
                    throw new BadRequestException();
                case 404:
                    logger.error("User service | Get User by ID |User not found");
                    throw new NotFoundException();
                default:
                    logger.error("User service | Get User by ID |Exception occured: ",error);
                    throw new BffError("error getting user "+userId);
            }
        });
    }

    async removeUser(userId){
        return await userApi.request({
            url:`/${userId}`,
            method:httpMethods.DELETE,
        })
        .then((response)=>{
            logger.info("User service | Remove User | Successfully deleted");
            return response.data;
        })
        .catch((error)=>{
            switch(error.status){
                case 400:
                    logger.error("User service | Remove User | Bad request");
                    throw new BadRequestException();
                case 404:
                    logger.error("User service | Remove User | User not found");
                    throw new NotFoundException();
                default:
                    logger.error("User service | Remove User | Exception occured: ",error);
                    throw new BffError("error deleting user "+userId);
            }
        });
    }

    async updateUser(userId, user){
        return await userApi.request({
            url:`/${userId}`,
            method:httpMethods.PUT,
            data:user,
        })
        .then((response)=>{
            logger.info("User service | Update User | Successfully deleted");
            return response.data;
        })
        .catch((error)=>{
            switch(error.status){
                case 400:
                    logger.error("User service | Update User | Bad request");
                    throw new BadRequestException();
                case 404:
                    logger.error("User service | Update User | User not found");
                    throw new NotFoundException();
                default:
                    logger.error("User service | Update User | Exception occured: ",error);
                    throw new BffError("error updating user "+userId);
            }
        });
    }
}

export default UserService;