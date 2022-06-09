<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>Notre super site de films</h1>
    <input
      v-model="movieName"
      @keyup.enter="fetchMovies"
      placeholder="Rentrez le nom d'un film"
    />
    <div>
      Watch a specific genre:
      <Genre v-for="genre in genres" :movieProp="genre" :key="genre.id" />
    </div>
    <br /><br />
    <div class="movies">
      <Movie v-for="movie in movies" :movieProp="movie" :key="movie.id" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Movie from "@/components/Movie.vue";
import Genre from "@/components/Genre.vue";

export default {
  name: "Home",
  data: function () {
    return {
      movieName: "",
      movies: [],
      string: "",
      genres: [],
    };
  },
  methods: {
    fetchMovies: function () {
      if (this.movieName == "") {
        this.string = `https://api.themoviedb.org/3/trending/movie/week?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&`;
        console.log("check");
      } else {
        this.string =
          `https://api.themoviedb.org/3/search/movie?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&query=` +
          this.movieName;
      }
      axios
        .get(this.string)
        .then((response) => {
          this.movies = JSON.parse(JSON.stringify(response.data.results));
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchGenre: function () {
      axios
        .get(`http://localhost:3000/movies/`)
        .then((response) => {
          console.log(response.data);
          this.movies = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
      console.log(this.genres);
      console.log("tableau genre");
      console.log(this.genres);
    },
  },
  mounted: function () {
    this.fetchMovies();
    this.fetchGenre();
  },
  components: { Movie, Genre },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  text-align: center;
  font-family: 'Poppins', sans-serif;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.movies {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 15px 5px 0 15px;
  box-shadow:  0px 0px 20px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  /* background-color: white; */
}

.header {
  margin-bottom: 50px;
}
#search_bar {
  width: 300px;
}
</style>
