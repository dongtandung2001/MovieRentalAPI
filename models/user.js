const Joi = require("joi");
const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  customer: new mongoose.Schema({
    isGold: {
      type: Boolean,
      default: false,
    }
  })
});

// encapsulating generating token in mongoose models to sync
// so that update will happen at all places.
userSchema.methods.generateAuthToken = function () {
  let token;
  if (this.customer) {
    token = jwt.sign(
      {
        _id: this._id,
        isAdmin: this.isAdmin,
        email: this.email,
        customer: this.customer._id,
      },
      config.get("jwtPrivateKey")
    );
  }
  else {
    token = jwt.sign(
      {
        _id: this._id,
        isAdmin: this.isAdmin,
        email: this.email,
      },
      config.get("jwtPrivateKey")
    );

  }
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
