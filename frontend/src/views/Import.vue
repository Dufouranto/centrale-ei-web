<template>
  <h1>Add a new movie</h1>
  <div class="movies">
    <AddMovie @MovieAdded="fetchMovie()" />
  </div>
</template>

<script>
import AddMovie from "@/components/AddMovie.vue";

export default {
  name: "Movies",
  components: {
    AddMovie,
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
