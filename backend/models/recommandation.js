const mongoose = require("mongoose");

const RecommandationSchema = new mongoose.Schema(
  {
    userid: { type: Number, required: true },
    movieid: { type: String },
    score: { type: Number },
  },
  {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
  }
);

RecommandationSchema.virtual("RecommandedMovies", {
  ref: "MovieModel",
  localField: "_id", // The user _id should match the viewers field in movies
  foreignField: "viewers",
});

const RecommandationModel = mongoose.model(
  "RecommandationModel",
  RecommandationSchema,
  "recommandations"
);

module.exports = RecommandationModel;
