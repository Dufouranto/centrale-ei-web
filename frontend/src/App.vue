<template>
  <div class="nav">
    <router-link class="nav-link" to="/">Home</router-link> |
    <router-link class="nav-link" to="/users">Users</router-link> |
    <router-link class="nav-link" to="/about">About</router-link> |
    <router-link class="nav-link" to="/connexion">Connexion</router-link>
    <router-link class="nav-link" to="/import">Add Movie</router-link>
  </div>
  <router-view />
</template>

<style scoped>
.nav {
  font-family: "Fredoka One", cursive;
  font-size: 32px;
  text-align: center;
  padding: 30px;
}

.nav-link {
  color: #020c0f;
  padding: 20px;
  text-decoration: none;
}

.nav-link.router-link-exact-active {
  color: #ffffff;
}
</style>
