const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    movieId: { type: mongoose.Schema.Types.ObjectId },
    mark: { type: Number },
  },
  {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
  }
);

LikeSchema.virtual("LikedMovies", {
  ref: "MovieModel",
  localField: "_id", // The user _id should match the viewers field in movies
  foreignField: "viewers",
});

const LikeModel = mongoose.model("LikeModel", LikeSchema, "likes");

module.exports = LikeModel;
