import axios from 'axios';
import logger from '../config/logger.js';
import config from '../config/conf.js';

class UserService{
    async getUsers(){
        return await axios.get(`${config.baseUrl}/users`)
        .then((response) => {
            logger.info("User service | Got user details");
            return response.data;
        })
        .catch((error)=>{
            logger.error("User service | Exception occured: ",error.cause);
            throw error;
        });
    }

    async addNewUser(user){
        return await axios.post(`${config.baseUrl}/users`,user)
        .then((response) => {
            logger.info("User service | Created user");
            return response.data;
        })
        .catch((error)=>{
            logger.error("User service | Exception occured: ",error.cause);
            throw error;
        });
    }

    async getUserById(userId){
        return await axios.get(`${config.baseUrl}/users/${userId}`)
        .then((response)=>{
            logger.info("User service | Got user details");
            return response.data;
        })
        .catch((error)=>{
            logger.error("User service | Exception occured: ",error.cause);
            throw error;
        });
    }

    async removeUser(userId){
        return await axios.delete(`${config.baseUrl}/users/${userId}`)
        .then((response)=>{
            logger.info("User service | Successfully deleted");
            return response.data;
        })
        .catch((error)=>{
            logger.error("User service | Exception occured: ",error.cause);
            throw error;
        });
    }

    async updateUser(userId, user){
        return await axios.put(`${config.baseUrl}/users/${userId}`,user)
        .then((response)=>{
            logger.info("User service | Successfully deleted");
            return response.data;
        })
        .catch((error)=>{
            logger.error("User service | Exception occured: ",error.cause);
            throw error;
        });
    }
}

export default UserService;