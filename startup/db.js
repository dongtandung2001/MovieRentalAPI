const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config')

module.exports = function () {
  const db = config.get('db');
  mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
    .then(() => {
      winston.log(`Connected to ${db}`)
    })
    .catch(() => winston.error('Cannot connect to DB'));
}