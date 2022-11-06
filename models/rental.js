const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

const Rental = mongoose.model('Rental', new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
      isGold: {
        type: Boolean,
        default: false
      },
      phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      }
    }),
    required: true
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
      }
    }),
    required: true
  },
  dateOut: {
    type: Date,
    required: true,
    default: new Date()
  },
  dateReturned: {
    type: Date,
    default: new Date().setDate(new Date().getDate() + 30),
  },
  rentalFee: {
    type: Number,
    min: 0
  }
}));

function validateRental(rental) {
  const schema = Joi.object({
    customerId: Joi.objectId(),
    movieId: Joi.objectId,
  });

  return schema.validate(rental);
}

exports.Rental = Rental;
exports.validate = validateRental;