const mongoose = require('mongoose');
const { genreSchema } = require('../models/genre');

const Joi = require('joi');


const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255,

    },

    numberInStock: {
        type: Number,
        required: true,
        min: 0,
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
    },
    genre: {
        type: genreSchema,
        required: true,
    }
});

const Movie = mongoose.model('Movie', movieSchema);


function validateMovie(movieObj) {
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required(),
        genreId: Joi.string().required(),
    });
    return schema.validate(movieObj);
}

module.exports.Movie = Movie;
module.exports.validate = validateMovie;
