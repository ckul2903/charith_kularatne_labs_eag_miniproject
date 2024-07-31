import axios from "axios";
import BffError from "./BffError.js";

class BadRequestError extends BffError{
    constructor(){
        super("bad request", axios.HttpStatusCode.BadRequest);
    }
}

export default BadRequestError;