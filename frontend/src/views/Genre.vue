<template>
  <div class="home">
    <h1>Film du genre {{ genre }}</h1>
    <div class="movies">
      <Movie v-for="movie in movies" :movieProp="movie" :key="movie.id" />
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
      tab_genre: {},
      genre: "",
    };
  },
  methods: {
    fetchMovies: function (id) {
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&with_genres=` +
            id
        )
        .then((response) => {
          this.movies = response.data.results;
        })
        .catch((error) => {
          console.error(error);
        });

      axios
        .get(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=a0a7e40dc8162ed7e37aa2fc97db5654"
        )
        .then((response) => {
          this.tab_genre = response.data.genres;
          for (var i = 0; i < this.tab_genre.length; i++) {
            if (this.tab_genre[i].id == this.$route.params.id) {
              this.genre = this.tab_genre[i].name;
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchGenre: function () {
      axios
        .get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&`
        )
        .then((response) => {
          this.genres = response.data.genres;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  mounted: function () {
    this.fetchMovies(this.$route.params.id);
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
  padding: 15px 5px 0 15px;
  box-shadow: 0px 0px 20px 0 rgba(0, 0, 0, 0.5),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-top: 5px;
  /* background-color: white; */
}
</style>
