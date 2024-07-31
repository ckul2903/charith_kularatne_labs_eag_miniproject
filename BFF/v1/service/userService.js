import axios from 'axios';
import logger from '../config/logger.js';
import config from '../config/conf.js';
import BadRequestException from '../exceptions/BadRequestError.js';
import NotFoundException from '../exceptions/NotFoundError.js';
import BffError from '../exceptions/BffError.js';

class UserService{
    async getUsers(){
        return await axios.get(`${config.baseUrlPrefix}/users`)
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
        return await axios.post(`${config.baseUrlPrefix}/users`,user)
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
        return await axios.get(`${config.baseUrlPrefix}/users/${userId}`)
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
        return await axios.delete(`${config.baseUrlPrefix}/users/${userId}`)
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
        return await axios.put(`${config.baseUrlPrefix}/users/${userId}`,user)
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