const mongoose = require('mongoose');
// const winston = require('winston');
const config = require('config')

module.exports = function () {
  const db = config.get('db');
  console.log(db);
  mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
    .then(() => {
      console.log(`Connected to ${db}`)
    })
    .catch(() => console.error('Cannot connect to DB'));
}