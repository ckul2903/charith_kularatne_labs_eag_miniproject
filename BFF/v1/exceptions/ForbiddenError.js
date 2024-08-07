import axios from "axios";
import BffError from "./BffError.js";

class ForbiddenError extends BffError{
    constructor(){
        super("Forbidden", axios.HttpStatusCode.NotFound);
    }
}

export default ForbiddenError;