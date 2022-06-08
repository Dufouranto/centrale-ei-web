const express = require("express");
const RecommandationModel = require("../models/recommandation");
const UserModel = require("../models/user");
const router = express.Router();

router.get("/", function (req, res) {
  UserModel.find({}).then(function (users) {
    res.json({ users: users });
  });
});

router.get("/:id/movies", async function (req, res) {
  const filter = { _id: req.params["id"] };
  const user = await RecommandationModel.find({
    userid: filter,
  })
    .populate("movieid")
    .sort({ scoreId: -1 });
  res.send(user);
});

router.post("/:userId/:movieId", async function (req, res) {
  const newRecommandation = new RecommandationModel({
    userId: req.params.userId,
    movieId: req.params.movieId,
    score: req.body.score,
  });

  await newRecommandation.save().then(function (newRecommandation) {
    res.status(201).json(newRecommandation);
  });
});

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
