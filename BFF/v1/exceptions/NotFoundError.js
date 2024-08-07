import axios from "axios";
import BffError from "./BffError.js";

class NotFoundError extends BffError{
    constructor(object = "Resource"){
        super(object+" not found", axios.HttpStatusCode.NotFound);
    }
}

export default NotFoundError;