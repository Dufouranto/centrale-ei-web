<template>
  <router-link :to="`/genre/${movieProp.id}`">
    <button type="button">{{ movieProp.name }}</button>
  </router-link>
  &nbsp;
</template>

<script>
export default {
  props: {
    movieProp: Object,
  },

  methods: {
    myMethod() {},
  },
  mounted: function () {
    this.myMethod();
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

button {
  padding: 3px;
  margin: 5px;
}
</style>
