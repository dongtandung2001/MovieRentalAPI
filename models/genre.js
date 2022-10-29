const Joi = require('joi');
const mongoose = require('mongoose');

const Genre = mongoose.model('Genre', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
}));

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  }
});

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required()
  });

  return schema.validate(genre);
}

exports.Genre = Genre;
exports.validate = validateGenre;
exports.genreSchema = genreSchema;