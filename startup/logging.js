const winston = require('winston');
require('winston-mongodb');

module.exports = function () {

  // handle exception except from express
  // unhandleRejection
  process.on('uncaughtException', ex => {
    console.log('WE GOT UNCAUGHT EXCEPTION');
    winston.error(ex.message, ex);
    process.exit(1);
  });

  process.on('unhandledRejection', ex => {
    console.log('WE GOT UNCAUGHT EXCEPTION');
    winston.error(ex.message, ex);
    process.exit(1);
  });

  // winston.ExceptionHanlde is similar to ^

  const uri = 'mongodb://localhost:27017/vidly';
  winston.add(new winston.transports.File({ filename: 'logfile.log' }));
  winston.add(new winston.transports.MongoDB({
    db: uri,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
    }
  }));

  //throw new Error('Something failed');
}