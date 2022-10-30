const mongoose = require('mongoose');
// const winston = require('winston');
const config = require('config')

module.exports = function () {
  const db = config.get('db');
  console.log('db', db);
  mongoose.connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
    .then(() => {
      console.log(`Connected to ${db}`)
    })
    .catch(() => console.error('Cannot connect to DB'));
}