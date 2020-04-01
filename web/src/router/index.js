import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/share",
    name: "share",
    component: () => import("../views/Share.vue")
  },
  {
    path: "/buy",
    name: "buy",
    component: () => import("../views/Buy.vue")
  },
  {
    path: "/message",
    name: "message",
    component: () => import("../views/Message.vue")
  },
  {
    path: "/my",
    name: "My",
    component: () => import("../views/My.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
