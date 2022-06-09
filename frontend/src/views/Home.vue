<template>
  <div class="home">
    <div class="header">
      <img alt="Vue logo" src="../assets/logo_remoov.png" />
      <h1></h1>
      <p>
        For a guide and recipes on how to configure / customize this project,<br />
        check out the
        <a href="https://cli.vuejs.org" target="_blank">vue-cli documentation</a>.
      </p>
      <p>Votre recherche : {{ movieName }}</p>
      <input id="search_bar" v-model="movieName" placeholder="Rentrez le nom d'un film" />
    </div>
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
        .get(`http://localhost:3000/movies/`)
        .then((response) => {
          console.log(response.data);
          this.movies = response.data;
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
