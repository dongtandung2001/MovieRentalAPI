const express = require("express");
const mongoose = require("mongoose");

const { Movie, validate } = require("../models/movie");
const { Genre } = require("../models/genre");
const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("title");
  res.send(movies);
});

router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);

  if (!genre)
    return res.status(404).send("Does not exist genre with the given ID...");

  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  movie = await movie.save();
  res.send(movie);
});

router.put("/:id", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const movie = await Movie.findByIdAndUpdate(req.params.id, { ...req.body });
  if (!movie)
    return res.status(404).send("Movie with the given ID does not exist");

  res.send(movie);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie) res.status(404).send("Does not exist movie with the given ID");
  res.send(movie);
});

router.get("/:id", validateObjectId, async (req, res) => {
  // if (!ObjectId.isValid(req.query.id)) {
  //     return res.status(400).send('Invalid ID');
  // }
  const movie = await Movie.findById(req.params.id);
  if (!movie)
    return res.status(404).send("Does not exist movie with the given ID");
  res.send(movie);
});

module.exports = router;
