import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import EditUser from "../views/EditUser.vue";
import AddUser from "../views/AddUser.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/user/:id",
      name: "user",
      component: EditUser,
    },
    {
      path: "/add_user",
      name: "addUser",
      component: AddUser,
    },
  ],
});

export default router;
