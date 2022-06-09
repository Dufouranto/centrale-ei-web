const express = require("express");
const LikeModel = require("../models/likes");
// const MovieModel = require("../models/movies");
const RecommandationModel = require("../models/recommandation");
const UserModel = require("../models/user");
const router = express.Router();

// list all the users
router.get("/", function (req, res) {
  UserModel.find({}).then(function (users) {
    res.json({ users: users });
  });
});

// List all recommanded movies sorted by decreasing rates
router.get("/:id/movies", async function (req, res) {
  const user = await RecommandationModel.find({ userId: req.params.id })
    .populate("movieId")
    .sort({ score: -1 });
  res.send(user);
});

//Add a like (a mark between 0 and 5, 0 for dislike)
router.post("/:userId/:movieId", async function (req, res) {
  console.log(req.body);
  const newLike = new LikeModel({
    userId: req.params.userId,
    movieId: req.params.movieId,
    mark: req.body.mark,
  });

  await newLike.save().then(function (newLike) {
    res.status(201).json(newLike);
  });
});

//Create a new user
router.post("/new", function (req, res) {
  const newUser = new UserModel({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  newUser
    .save()
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === 11000) {
        res.status(400).json({
          message: `User with email "${newUser.email}" already exists`,
        });
      } else {
        res.status(500).json({ message: "Error while creating the user" });
      }
    });
});

//Delete a user
router.delete("/:userId", function (req, res) {
  UserModel.deleteOne({ _id: req.params.userId })
    .then(function () {
      res.status(204).json({ message: "User successfully deleted" });
    })
    .catch(function () {
      res.status(500).json({ message: "Error while deleting the user" });
    });
});

module.exports = router;
