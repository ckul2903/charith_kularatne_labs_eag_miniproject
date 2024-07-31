class BffError extends Error{
    constructor(message = "Exception occured" ,statusCode = 500){
        super(message);
        this.cause = message;
        this.statusCode = statusCode;
    }
}

export default BffError;