import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
// import Counter from "../views/Counter.vue";
import Users from "../views/Users.vue";
import About from "../views/About.vue";
import Genre from "../views/Genre.vue";
import Movie from "../views/Movie.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/movie/:id",
    name: "Movie",
    component: Movie,
  },
  {
    path: "/genre/:id",
    name: "Genre",
    component: Genre,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
