const {constants} = require("../constants");

const errorHandler = (err,req,res,next) =>{
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                status: false,
                title: 'Validation Failed',
                message: err.message
            });
            break;
        
        case constants.NOT_FOUND:
            res.json({
                status: false,
                title: 'Not Found',
                message: err.message
            });
            break;
        
        case constants.FORBIDDEN:
            res.json({
                status: false,
                title: 'Forbidden',
                message: err.message
            });
            break;

        case constants.UNAUTHORIZED:
            res.json({
                status: false,
                title: 'Unauthorized',
                message: err.message
            });
            break;
        
        case constants.SERVER_ERROR:
            res.json({
                status: false,
                title: 'Server Error',
                message: err.message
            });
            break;
    
        default:
            console.log('No Error yet.');
            break;
    }
    
};

module.exports = errorHandler;