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
            logger.info("User service | Got user details");
            return response.data;
        })
        .catch((error)=>{
            logger.error("User service | Exception occured: ",error);
            throw new BffError();
        });
    }

    async createUser(user){
        return await userApi.request({
            method:httpMethods.POST,
            data:user,
        })
        .then((response) => {
            logger.info("User service | Created user");
            return response.data;
        })
        .catch((error)=>{
            switch(error.status){
                case 400:
                    logger.error("User service | Bad request");
                    throw new BadRequestException();
                default:
                    logger.error("User service | Exception occured: ",error);
                    throw new BffError();
            }
        });
    }

    async getUserById(userId){
        return await userApi.request({
            url:`/${userId}`,
            method:httpMethods.GET,
        })
        .then((response)=>{
            logger.info("User service | Got user details");
            return response.data;
        })
        .catch((error)=>{
            switch(error.status){
                case 400:
                    logger.error("User service | Bad request");
                    throw new BadRequestException();
                case 404:
                    logger.error("User service | User not found");
                    throw new NotFoundException();
                default:
                    logger.error("User service | Exception occured: ",error);
                    throw new BffError();
            }
        });
    }

    async removeUser(userId){
        return await userApi.request({
            url:`/${userId}`,
            method:httpMethods.DELETE,
        })
        .then((response)=>{
            logger.info("User service | Successfully deleted");
            return response.data;
        })
        .catch((error)=>{
            switch(error.status){
                case 400:
                    logger.error("User service | Bad request");
                    throw new BadRequestException();
                case 404:
                    logger.error("User service | User not found");
                    throw new NotFoundException();
                default:
                    logger.error("User service | Exception occured: ",error);
                    throw new BffError();
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
            logger.info("User service | Successfully deleted");
            return response.data;
        })
        .catch((error)=>{
            switch(error.status){
                case 400:
                    logger.error("User service | Bad request");
                    throw new BadRequestException();
                case 404:
                    logger.error("User service | User not found");
                    throw new NotFoundException();
                default:
                    logger.error("User service | Exception occured: ",error);
                    throw new BffError();
            }
        });
    }
}

export default UserService;