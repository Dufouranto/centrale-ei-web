const mongoose = require("mongoose");
//const { Schema } = mongoose;

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String },
  url: { type: String },
  popularity: { type: Number },
  genre_ids: { type: Array },
  release_date: { type: String },
  poster_path: { type: String },
  //viewers: [{ type: Schema.Types.ObjectId, ref: "UserModel" }],
});

MovieSchema.virtual("viewers", {
  ref: "UserModel",
  localField: "_id", // The movie _id should match the userid
  foreignField: "userid",
});

const MovieModel = mongoose.model("MovieModel", MovieSchema, "movies");

module.exports = MovieModel;
