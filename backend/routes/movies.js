const { query } = require("express");
const express = require("express");
const MovieModel = require("../models/movies");
const router = express.Router();

module.exports = router;

//List all the movies
router.get("/", async function (req, res) {
  let query = {};
  if (req.query.q) {
    query = {
      $text: {
        $search: req.query.q,
        $language: "english",
        $diacriticSensitive: true,
      },
    };
  }
  const listFilm = await MovieModel.find(
    query,
    "original_title poster_path release_date"
  );
  res.send(listFilm);
});

router.get("/search/", async function (req, res) {
  // find each film, selecting the `title` field
  console.log(req.query);
  const query = {
    $text: {
      $search: req.query.q,
      $language: "english",
      $diacriticSensitive: true,
    },
  };
  const listFilm = await MovieModel.find(
    query,
    "original_title poster_path release_date"
  );
  res.send(listFilm);
});

//Insert a movie in the Database
router.post("/new", async function (req, res) {
  try {
    const newMovie = new MovieModel({
      title: newMovie.original_title,
      desc: newMovie.overview,
      popularity: newMovie.popularity,
      genre_ids: newMovie.genre_ids,
      release_date: newMovie.release_date,
      poster_path: newMovie.poster_path,
    });

    await newMovie.save();

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

//Update a movie
router.put("/:id", async function (req, res) {
  const filter = { _id: req.params["id"] };
  const update = req.body;
  let movie = await MovieModel.findOneAndUpdate(filter, update, {
    new: true,
  });
  res.send(movie);
});

router.get("/:id", async function (req, res) {
  const movie = await MovieModel.findById(req.params.id);
  res.send(movie);
});
