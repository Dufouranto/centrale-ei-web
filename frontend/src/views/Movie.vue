<template>
  <div class="home">
    <title>Test</title>
  </div>
  <p></p>
  <div class="poster">
    <img
      v-if="movie.poster_path != null"
      class="image"
      :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
    />
    <h1>{{ this.movie.title }}</h1>
    Genre:
    <Genre v-for="genre in movie.genres" :movieProp="genre" :key="genre.id" />
    <br /><br />
    Rating : {{ this.movie.vote_average }}/10
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    Description: {{ this.movie.overview }}
  </div>
</template>

<script>
import axios from "axios";
import Genre from "@/components/Genre.vue";
import image from "./no poster.png";

export default {
  name: "MoviePage",
  data: function () {
    return {
      movie: {},
      link: "",
      genre: {},
      image: image,
    };
  },
  methods: {
    fetchMovie: function (id) {
      this.link =
        "https://api.themoviedb.org/3/movie/" +
        id +
        "?api_key=a0a7e40dc8162ed7e37aa2fc97db5654";
      axios
        .get(this.link)
        .then((response) => {
          this.movie = response.data;
          console.log(this.movie.genres);
          console.log(this.movie.genres[0].name);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  mounted: function () {
    this.fetchMovie(this.$route.params.id);
  },
  components: { Genre },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  text-align: center;
}

.image {
  float: left;
  margin: 0 30px 15px 0;
}

.box {
  width: 150px;
  height: 100px;
  border-radius: 5px;
  background-color: rgb(22, 47, 67);
  padding: 1em;
}
</style>
