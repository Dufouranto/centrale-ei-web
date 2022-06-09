const mongoose = require("mongoose");
const MovieModel = require("./models/movies");
const axios = require("axios");

async function fetchMoviesFromTheMovieDatabase() {
  let moviesList = [];
  for (let i = 1; i <= 4; i++) {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&language=fr-FR&page=${i}`
    );
    for (let movie of res.data.results) {
      moviesList.push(movie);
      console.log(movie);
    }
  }
  return moviesList;
}

async function populateMovies(movies) {
  for (let movie of movies) {
    const newMovie = new MovieModel({
      title: movie.original_title,
      desc: movie.overview,
      popularity: movie.popularity,
      genre_ids: movie.genre_ids,
      release_date: movie.release_date,
      poster_path: movie.poster_path,
    });
    await newMovie.save();
  }
}

async function dropDataBase() {
  await MovieModel.deleteMany({});
}

async function populate() {
  // Connect mongoose client
  const client = await mongoose.connect(process.env.MONGO_DB_URL);

  const movies = await fetchMoviesFromTheMovieDatabase();

  await dropDataBase();

  await populateMovies(movies);

  // disconnect mongoose client
  await client.disconnect();
}

populate()
  .then(() => {
    console.log("All done !");
  })
  .catch((error) => {
    console.error(error);
  });
