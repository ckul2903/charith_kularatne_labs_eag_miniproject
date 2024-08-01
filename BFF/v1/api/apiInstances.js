import axios from "axios";
import config from "../config/conf.js";

const productApi = axios.create({
    baseURL: config.baseUrlPrefix+"/products",
    withCredentials: false,
});

const cartApi = axios.create({
    baseURL: config.baseUrlPrefix+"/carts",
    withCredentials: false,
});

const userApi = axios.create({
    baseURL: config.baseUrlPrefix+"/users",
    withCredentials: false,
});

export {productApi,cartApi,userApi};