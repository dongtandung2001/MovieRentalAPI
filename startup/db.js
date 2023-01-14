const mongoose = require('mongoose');
// const winston = require('winston');
const config = require('config')

const conn = mongoose.connection;

conn.on('error', () => console.error.bind(console, 'connection error'));

conn.once('open', () => console.info('Connection to Database is successful'));


module.exports = function () {
  const db = config.get('db');
  console.log('db', db);
  mongoose.connect(db, {
    family: 4
  })
    .then(() => {
      console.log(`Connected to ${db}`)
    })
    .catch(() => console.error('Cannot connect to DB'));


}

module.exports.connection = conn;