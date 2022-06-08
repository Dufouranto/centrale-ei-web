const express = require("express");
const MovieModel = require("../models/movies");
const router = express.Router();

module.exports = router;

router.get("/", async function (req, res) {
  // find each film, selecting the `title` field
  const listFilm = await MovieModel.find({}, "title viewers")
    .populate("viewers")
    .exec();
  res.send(listFilm);
});

router.post("/new", async function (req, res) {
  try {
    const newMovie = new MovieModel({
      title: req.body.title,
      desc: req.body.desc,
      url: req.body.url,
      viewers: req.body.viewers,
    });

    const createdMovie = await newMovie.save();

    // What to do after the movie was saved
  } catch (error) {
    // What to do if there was an error !
    if (error.code === 11000) {
      res.status(400).json({
        message: `Film with title "${req.body.title}" already exists`,
      });
    } else {
      res.status(500).json({ message: "Error while creating the film" });
    }
  }
});

router.put("/:id", async function (req, res) {
  const filter = { _id: req.params["id"] };
  const update = req.body;
  let movie = await MovieModel.findOneAndUpdate(filter, update, {
    new: true,
  });
  res.send(movie);
});
