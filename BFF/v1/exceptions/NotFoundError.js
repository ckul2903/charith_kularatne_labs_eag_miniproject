import axios from "axios";
import BffError from "./BffError.js";

class NotFoundError extends BffError{
    constructor(object){
        super(object+"not found", axios.HttpStatusCode.NotFound);
    }
}

export default NotFoundError;