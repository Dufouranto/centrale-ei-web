<template>
  <div class="movie">
    <img
      class="poster"
      :src="`https://image.tmdb.org/t/p/w500${movieProp.poster_path}`"
    />
    <div>{{ movieProp.title }}</div>
    <div></div>
    <div>{{ movieProp.release_date }}</div>
  </div>
</template>

<script>
export default {
  name: "Movie",
  props: {
    movieProp: Object,
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
</style>
