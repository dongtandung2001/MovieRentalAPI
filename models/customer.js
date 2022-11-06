const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
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
    maxlength: 255
  },
  SSN: {
    type: String,
    required: true,
    default: "xxx-xx-xxxx",
  },
  rents: [{
    movie: new mongoose.Schema({
      title: {
        type: String,
        required: true,
      }
    }),
    dateOut: {
      type: Date,
      required: true,
    },
    dateReturned: {
      type: Date,
    },
  }]
}));

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    SSN: Joi.string(),
  });

  return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;