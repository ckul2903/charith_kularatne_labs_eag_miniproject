const axios = require('axios');
const logger = require('../config/logger');
const { baseUrl } = require('../constants/constants');

class UserService{
    async getUsers(){
        return await axios.get(`${baseUrl}/users`)
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
        return await axios.post(`${baseUrl}/users`,user)
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
        return await axios.get(`${baseUrl}/users/${userId}`)
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
        return await axios.delete(`${baseUrl}/users/${userId}`)
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
        return await axios.put(`${baseUrl}/users/${userId}`,user)
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

module.exports = UserService;