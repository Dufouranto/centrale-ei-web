<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>Notre super site de films</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank">vue-cli documentation</a>.
    </p>
    <p>Votre recherche: {{ movieName }}</p>
    <input v-model="movieName" placeholder="Rentrez le nom d'un film" />
    <div class="movies">
      <Movie v-for="movie in movies" :movieProp="movie" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Movie from "@/components/Movie.vue";

export default {
  name: "Home",
  data: function () {
    return {
      movieName: "",
      movies: [],
    };
  },
  methods: {
    fetchMovies: function () {
      axios
        .get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=a0a7e40dc8162ed7e37aa2fc97db5654`
        )
        .then((response) => {
          console.log(response.data.results);
          this.movies = response.data.results;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  mounted: function () {
    this.fetchMovies();
  },
  components: { Movie },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  text-align: center;
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
}
</style>
