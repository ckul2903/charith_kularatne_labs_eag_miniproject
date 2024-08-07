import axios from "axios";
import BffError from "./BffError.js";

class BadRequestError extends BffError{
    constructor(){
        super("Bad request", axios.HttpStatusCode.BadRequest);
    }
}

export default BadRequestError;