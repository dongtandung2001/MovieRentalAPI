const { Rental, validate } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();
const config = require('config');

const { connection } = require('../startup/db');

router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie.');

  if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

  console.log('filter', customer.rents.filter(rent => rent.movie._id.toString() === movie._id.toString()));
  if (customer.rents.filter(rent => rent.movie._id.toString() === movie._id.toString()).length === 1) {
    return res.status(400).send('You already rented this movie');
  }
  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });

  const session = await connection.startSession();
  try {
    session.startTransaction();

    await rental.save({ session });
    await movie.update({ $inc: { numberInStock: -1 } }, { session });


    customer.rents.push({
      movie: {
        _id: movie._id,
        title: movie.title,
      },
      dateOut: rental.dateOut,
      dateReturned: rental.dateReturned,
    })
    await customer.save();


    await session.commitTransaction();
    console.log('success');

    res.send(rental);
    session.endSession();
  }
  catch (ex) {
    console.log('error');
    await session.abortTransaction();
    res.status(500).send('Something failed.');
  } finally {
    session.endSession();
  }
});

router.get('/:id', async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental) return res.status(404).send('The rental with the given ID was not found.');

  res.send(rental);
});

module.exports = router; 