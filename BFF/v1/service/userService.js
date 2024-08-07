import logger from '../config/logger.js';
import BadRequestException from '../exceptions/BadRequestError.js';
import NotFoundException from '../exceptions/NotFoundError.js';
import BffError from '../exceptions/BffError.js';
import { userApi } from '../api/apiinstances.js';
import { httpMethods } from '../config/constants.js';

class UserService{
    getUsers(){
        return new Promise((resolve, reject) => {
            userApi.request({
                method:httpMethods.GET
            })
            .then((response) => {
                logger.info("User service | Get User |Got user details");
                resolve(response.data);
            })
            .catch((error)=>{
                logger.error("User service | Get User | ",error);
                reject(new BffError("error getting user list"));
            });
        });
    }

    createUser(user){
        return new Promise((resolve, reject) => {
            userApi.request({
                method:httpMethods.POST,
                data:user,
            })
            .then((response) => {
                logger.info("User service | Create User | Created user");
                resolve(response.data);
            })
            .catch((error)=>{
                switch(error.status){
                    case 400:
                        logger.error("User service | Create User | Bad request");
                        reject(new BadRequestException());
                        break;
                    default:
                        logger.error("User service | Create User | Exception occured: ",error);
                        reject(new BffError("error creating user"));
                }
            });
        }) 
    }

    getUserById(userId){
        return new Promise((resolve, reject) => {
            userApi.request({
                url:`/${userId}`,
                method:httpMethods.GET,
            })
            .then((response)=>{
                logger.info("User service | Get User by ID | Got user");
                resolve(response.data);
            })
            .catch((error)=>{
                switch(error.response.status){
                    case 400:
                        logger.error("User service | Get User by ID |Bad request");
                        reject(new BadRequestException());
                        break;
                    case 404:
                        logger.error("User service | Get User by ID |User not found");
                        reject(new NotFoundException(`user ${userId}`));
                        break;
                    default:
                        logger.error("User service | Get User by ID |Exception occured: ",error);
                        reject(new BffError("error getting user "+userId));
                }
            });
        });
    }

    removeUser(userId){
        return new Promise((resolve, reject) => {
            userApi.request({
                url:`/${userId}`,
                method:httpMethods.DELETE,
            })
            .then((response)=>{
                logger.info("User service | Remove User | Successfully deleted");
                resolve(response.data);
            })
            .catch((error)=>{
                switch(error.response.status){
                    case 400:
                        logger.error("User service | Remove User | Bad request");
                        reject(new BadRequestException());
                        break;
                    case 404:
                        logger.error("User service | Remove User | User not found");
                        reject(new NotFoundException());
                        break;
                    default:
                        logger.error("User service | Remove User | Exception occured: ",error);
                        reject(new BffError("error deleting user "+userId));
                }
            });
        });
    }

    updateUser(userId, user){
        return new Promise((resolve, reject) => {
            userApi.request({
                url:`/${userId}`,
                method:httpMethods.PUT,
                data:user,
            })
            .then((response)=>{
                logger.info("User service | Update User | Successfully deleted");
                resolve(response.data);
            })
            .catch((error)=>{
                switch(error.response.status){
                    case 400:
                        logger.error("User service | Update User | Bad request");
                        reject(new BadRequestException());
                        break;
                    case 404:
                        logger.error("User service | Update User | User not found");
                        reject(new NotFoundException());
                        break;
                    default:
                        logger.error("User service | Update User | Exception occured: ",error);
                        reject(new BffError("error updating user "+userId));
                }
            });
        });
    }
}

export default UserService;