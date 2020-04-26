import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/home/main" },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Home/Home.vue"),
    children: [
      {
        path: "attention",
        name: "attention",
        component: () => import("../views/Home/components/Attention.vue"),
      },
      {
        path: "main",
        name: "main",
        component: () => import("../views/Home/components/Main.vue"),
      },
      {
        path: "reward",
        name: "rearby",
        component: () => import("../views/Home/components/Reward.vue"),
      },
    ],
  },
  {
    path: "/share",
    name: "share",
    component: () => import("../views/Share/Share.vue"),
    children: [
      {
        path: "myshare",
        name: "myshare",
        component: () => import("../views/Share/components/MyShare.vue"),
      },
      {
        path: "recommend",
        name: "recommend",
        component: () => import("../views/Share/components/Recommend.vue"),
      },
    ],
  },
  {
    path: "/buy",
    name: "buy",
    component: () => import("../views/Buy.vue"),
  },
  {
    path: "/message",
    name: "message",
    component: () => import("../views/Message/Message.vue"),
  },
  {
    path: "/my",
    name: "My",
    component: () => import("../views/My.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
