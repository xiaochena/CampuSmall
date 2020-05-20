import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Main from "../views/Main.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/main", redirect: "/main/certification" },
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
        path: "certification",
        name: "Certification",
        component: () => import("../views/Certification.vue"),
      },
      {
        path:"applyschool",
        name: "ApplySchool",
        component: () => import("../views/ApplySchool.vue"),
      },
      {
        path:"goods",
        name: "Goods",
        component: () => import("../views/Goods.vue"),
      }
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
