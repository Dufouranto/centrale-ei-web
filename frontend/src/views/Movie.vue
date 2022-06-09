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
    <Genre v-for="genre in movie.genres" :movieProp="genre" :key="genre.id" /> •
    &nbsp; {{ min_to_hours(this.movie.runtime) }} <br /><br />
    Rating : {{ this.movie.vote_average }}/10 <br /><br />
    Your mark:
    <input
      type="range"
      class="form-control-range"
      id="formControlRange"
      v-model="value"
      min="0"
      max="10"
    />
    {{ value }}/10
    <input type="submit" value="Submit" />
    <br /><br /><br /><br /><br /><br />
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
      value: 0,
      hours: 0,
      minuts: 0,
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
          console.log(this.movie);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    min_to_hours: function (int) {
      this.minuts = int % 60;
      this.hours = (int - this.minuts) / 60;
      console.log(this.movie);
      return this.hours + "h" + this.minuts;
    },
  },
  mounted: function () {
    this.fetchMovie(this.$route.params.id);
    this.min_to_hours();
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
