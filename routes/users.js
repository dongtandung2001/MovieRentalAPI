const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user");
const _ = require("lodash");

const express = require("express");
const { Customer } = require("../models/customer");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already existed");

  // encrypt password using 'bcrypt'

  user = new User(_.pick(req.body, ["email", "password"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  // dont send password back to the respond
  // use Lodash JS
  // return new object with chosen properties

  // create token return to response header
  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["_id", "email"]));
});

router.put("/:id", async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findById(req.params.id);
  if (!user)
    return res.status(404).send("User with the given ID does not exist");

  user.customer = new Customer({
    _id: req.body._id,
  })

  await user.save();


  res.send(user);

})

// get current user
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

module.exports = router;
