const mongoose = require("mongoose");

// Modèle MovieSchéma:
//   "genres",
//   "_id",
//   "original_title",
//   "overview",
//   "poster_path",
//   "release_date",

const MovieSchema = new mongoose.Schema(
  {
    original_title: { type: String, required: true },
    overview: { type: String },
    genres: { type: Array },
    release_date: { type: String },
    poster_path: { type: String },
  },
  {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
  }
  // viewers: [{ type: Schema.Types.ObjectId, ref: "UserModel" }],
);

MovieSchema.virtual("ratings", {
  ref: "RecommandationModel",
  localField: "_id", // The movie _id should match the userid
  foreignField: "MovieId",
});

const MovieModel = mongoose.model("MovieModel", MovieSchema, "movies");

module.exports = MovieModel;
