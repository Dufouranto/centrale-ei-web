<template>
  <router-link :to="`/genre/${movieProp.id}`">
    {{ movieProp.name }}
  </router-link>
  &nbsp
</template>

<script>
export default {
  props: {
    movieProp: Object,
  },

  methods: {
    myMethod() {
      console.log("check");
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
