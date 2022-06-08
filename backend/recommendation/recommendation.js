import axios from "axios";


for movie_id of genre_ids:
    movies_reco

export default {
  name: "Recommendation",
  data: function () {
    return {
      movies_reco: [],
    };
  },
  methods: {
    fetchMovies: function () {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/`+ movie_id +`/similar?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&page=1`
        )
        .then((response) => {
          this.movies_reco = response.data.results;
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