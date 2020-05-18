import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Main from "../views/Main.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/main", redirect: "/main/persinfo" },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/main",
    name: "Main",
    component: Main,
    children: [
      {
        path: "persinfo",
        name: "persinfo",
        component: () => import("../views/Persinfo.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
