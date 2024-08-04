import logger from '../config/logger.js';
import BadRequestException from '../exceptions/BadRequestError.js';
import NotFoundException from '../exceptions/NotFoundError.js';
import BffError from '../exceptions/BffError.js';
import { productApi } from '../api/apiinstances.js';
import { httpMethods } from '../config/constants.js';

class ProductService{
    getProducts(){
        return new Promise((resolve, reject) => {
            productApi.request({
                method:httpMethods.GET
            })
            .then((response) => {
                logger.info("Product service | Get Products | Got product details");
                resolve(response.data);
            })
            .catch((error)=>{
                logger.error("Product service | Get Products | ",error);
                reject(new BffError("error getting product list"));
            });
        });
    }

    addNewProduct(product){
        return new Promise((resolve, reject) => {
            productApi.request({
                method:httpMethods.POST,
                data:product
            })
            .then((response) => {
                logger.info("Product service | Create Products | Created product");
                resolve(response.data);
            })
            .catch((error)=>{
                switch(error.status){
                    case 400:
                        logger.error("Product service | Create Products | Bad request");
                        reject(new BadRequestException());
                    default:
                        logger.error("Product service | Create Products | ",error);
                        reject(new BffError("error adding product"));
                }
            });
        });
    }

    async getProductById(productId){
        return new Promise((resolve, reject) => {
            productApi.request({
                url:`/${productId}`,
                method:httpMethods.GET,
            })
            .then((response)=>{
                logger.info("Product service | Get Product by ID | Got product details");
                resolve(response.data);
            })
            .catch((error)=>{
                switch(error.status){
                    case 400:
                        logger.error("Product service | Get Product by ID | Bad request");
                        reject(new BadRequestException());
                        break;
                    case 404:
                        logger.error("Product service | Get Product by ID | Product not found");
                        reject(new NotFoundException());
                        break;
                    default:
                        logger.error("Product service | Get Product by ID | ",error);
                        reject(new BffError("error getting product "+productId));
                }
            });
        });
    }

    async removeProduct(productId){
        return new Promise((resolve, reject) => {
            productApi.request({
                url:`/${productId}`,
                method:httpMethods.DELETE,
            })
            .then((response)=>{
                logger.info("Product service | Delete Products | Successfully deleted");
                resolve(response.data);
            })
            .catch((error)=>{
                switch(error.status){
                    case 400:
                        logger.error("Product service | Delete Products | Bad request");
                        reject(new BadRequestException());
                    case 404:
                        logger.error("Product service | Delete Products | Product not found");
                        reject(new NotFoundException());
                    default:
                        logger.error("Product service | Delete Products | ",error);
                        reject(new BffError("error deleting product "+productId));
                }
            });
        });
    }

    async updateProduct(productId, product){
        return new Promise((resolve, reject) => {
            productApi.request({
                url:`/${productId}`,
                method:httpMethods.PUT,
                data:product
            })
            .then((response)=>{
                logger.info("Product service | Update Products | Successfully updated");
                resolve(response.data);
            })
            .catch((error)=>{
                switch(error.status){
                    case 400:
                        logger.error("Product service | Update Products | Bad request");
                        reject(new BadRequestException());
                        break;
                    case 404:
                        logger.error("Product service | Update Products | Product not found");
                        reject(new NotFoundException());
                        break;
                    default:
                        logger.error("Product service | Update Products | ",error);
                        reject(new BffError("error updating product "+productId));
                }
            });
        })
    }

    async getProductCategories(){
        return new Promise((resolve, reject) => {
            productApi.request({
                url:`/categories`,
                method:httpMethods.GET,
            })
            .then((response) => {
                logger.info("Product service | Get Product Categories | Recieved data");
                resolve(response.data);
            })
            .catch((error)=>{
                logger.error("Product service | Get Product Categories | ",error);
                reject(new BffError("error getting category list"));
            });
        });
    }
}

export default ProductService;