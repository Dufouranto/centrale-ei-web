const mongoose = require("mongoose");

const RecommandationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    movieId: { type: mongoose.Schema.Types.ObjectId },
    score: { type: Number },
  },
  {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
  }
);

RecommandationSchema.virtual("RecommandedMovies", {
  ref: "MovieModel",
  localField: "movieid", // The movie id should match the id field in movies
  foreignField: "_id",
});

const RecommandationModel = mongoose.model(
  "RecommandationModel",
  RecommandationSchema,
  "recommandations"
);

module.exports = RecommandationModel;
