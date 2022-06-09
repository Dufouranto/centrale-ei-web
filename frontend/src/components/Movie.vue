<template>
  <div class="movie" v-if="movieProp.poster_path != null">
    <router-link :to="`/movie/${movieProp.id}`">
      <img
        class="poster"
        :src="`https://image.tmdb.org/t/p/w500${movieProp.poster_path}`"
      />
    </router-link>
    <div>{{ movieProp.title }}</div>
    <div></div>
    <div style="font-size: x-small">
      {{ ConvertDate(movieProp.release_date) }} -
      {{ movieProp.vote_average }}/10
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movieProp: Object,
  },
  data: function () {
    return {
      year: 0,
      month: 0,
      day: 0,
      ref_month: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  },

  methods: {
    myMethod() {
      console.log("check");
      this.$router.push("/Counter");
    },
    ConvertDate(string) {
      this.year = string.slice(0, 4);
      this.month = string.slice(5, 7);
      this.day = string.slice(8, 10);
      return (
        this.day +
        " " +
        this.ref_month[parseInt(this.month) - 1] +
        " " +
        this.year
      );
    },
  },
};
</script>

<style scoped>
.movie {
  width: 150px;
}
.poster {
  width: 100%;
}
li.pointer {
  cursor: pointer;
}
</style>
