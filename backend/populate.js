const mongoose = require("mongoose");
const MovieModel = require("./models/movies");
const axios = require("axios");

async function fetchMoviesFromTheMovieDatabase() {
  let moviesList = [];
  for (let i = 1; i <= 5; i++) {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&language=fr-FR&page=${i}`
    );
    for (let movie of res.data.results) {
      moviesList.push(movie);
      // console.log(movie);
    }
  }
  console.log(moviesList);
  return moviesList;
}

async function linkGenreIdName() {
  let dict_genres = {}
  const list_genres = await axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=a0a7e40dc8162ed7e37aa2fc97db5654");
  for (let genre of list_genres.data.genres) {
    dict_genres[genre.id] = genre.name;
  }
  return dict_genres;
}

async function populateMovies(movies) {
  const dict_genres = await linkGenreIdName();

  for (let movie of movies) {
    const newMovie = new MovieModel({
      original_title: movie.original_title,
      overview: movie.overview,
      genres: movie.genre_ids.map(function (id) {
        return { id: id, name: dict_genres[id] };
      }),
      release_date: movie.release_date,
      poster_path: movie.poster_path,
    });
    console.log(newMovie);
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
