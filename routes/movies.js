const express = require('express');
const mongoose = require('mongoose');

const {Movie, validate} = require('../models/movie');
const {Genre} = require('../models/genre');
const router = express.Router();

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('title');
    res.send(movies);
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = Genre.findById(req.body.genreId);
    if(!genre) return res.status(404).send('Does not exist genre with the given ID...');

    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
    });
    movie = await movie.save();
    res.send(movie);
});