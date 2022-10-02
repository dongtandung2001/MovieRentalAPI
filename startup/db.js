const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function() {
    const uri = 'mongodb://localhost:27017/vidly';
    mongoose.connect(uri, {
      useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
  .then(() => winston.info('Connected to MongoDB...'))
  .catch(() => winston.error('Cannot connect to DB'));  
}