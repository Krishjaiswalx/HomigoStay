class ExpressError extends Error {
    constructor(statusCode, message){
        super(); // Call the parent class (Error) constructor
        this.statusCode = statusCode; // Custom status code for HTTP error
        this.message = message; // Custom error message
    }
}
module.exports = ExpressError;
