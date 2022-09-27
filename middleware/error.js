const winston = require('winston');
module.exports = function(err, req, res, next) {
    // log the exception
    // winston js
    winston.log('error', err.message);
    // error
    // warning
    // info
    // verbose
    // debug
    // silly

    // winston-mongodb to log error to mongodb

    res.status(500).send('Something failed');
};

// install express-async-errors