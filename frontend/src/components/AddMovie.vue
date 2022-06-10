<template>
  <div class="add-movie-form-container">
    <form ref="addMovieForm">
      Titre:
      <input
        class="add-movie-input"
        v-model="movie.title"
        placeholder="Fantastic Beasts: The Secrets of Dumbledore"
        required
        size="111"
      />
      <br /><br />
      Description:
      <input
        class="add-movie-input"
        v-model="movie.desc"
        placeholder="Le professeur Albus Dumbledore sait que le puissant mage noir Gellert Grindelwald cherche à prendre le contrôle du monde des sorciers. Incapable de l’empêcher d’agir seul, il
    sollicite le magizoologiste Norbert Dragonneau pour qu’il réunisse des
    sorciers, des sorcières et un boulanger moldu au sein d’une équipe
    intrépide. Leur mission des plus périlleuses les amènera à affronter des
    animaux, anciens et nouveaux, et les disciples de plus en plus nombreux de
    Grindelwald. Pourtant, dès lors que que les enjeux sont aussi élevés,
    Dumbledore pourra-t-il encore rester longtemps dans l’ombre ?"
        size="103"
      />
      <br /><br />
      Genres:
      <input
        class="add-movie-input"
        v-model="movie.genres_id"
        placeholder="[{&ldquo;id&rdquo;: 14, &ldquo;name&rdquo;: &ldquo;Fantasy &rdquo;}, {&ldquo;id&rdquo;: 12,
    &ldquo;name&rdquo;: &ldquo;Adventure &rdquo;}, {&ldquo;id&rdquo;: 28,
    &ldquo;name&rdquo;: &ldquo;Action &rdquo; }]"
        size="108"
      />
      <br /><br />
      Date de sortie:
      <input
        class="add-movie-input"
        v-model="movie.release_date"
        placeholder="2022-04-06"
        size="100"
      />
      <br /><br />
      Lien vers l'affiche
      <input
        class="add-movie-input"
        v-model="movie.poster_path"
        placeholder="/uXs7wMtsfnBFuGVogAxJXZXshFU.jpg"
        size="97"
      />
    </form>
    <br />
    <button class="add-movie-button" @click="addMovie()">Add movie</button>
    <div v-if="movieCreationError">{{ movieCreationError }}</div>
    <br /><br />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddMovie",
  emits: ["movieAdded"],
  data: function () {
    return {
      movie: {
        title: "",
        desc: "",
        genres_id: [],
        release_date: "",
        poster_path: "",
      },
      movieCreationError: "",
    };
  },
  methods: {
    addMovie: function () {
      if (!this.$refs.addMovieForm.checkValidity()) {
        this.$refs.addMovieForm.reportValidity();
        console.log("ok");
        return;
      }

      axios
        .post(`${process.env.VUE_APP_BACKEND_BASE_URL}/movies/new`, this.movie)
        .then(() => {
          this.$emit("movieAdded");
          this.movie = {
            title: "",
            desc: "",
            genre_ids: [],
            release_date: "",
            poster_path: "",
          };
        })
        .catch((error) => {
          this.userCreationError = "An error occured while creating new Movie.";
          console.error(error);
        });
    },
  },
};
</script>

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
