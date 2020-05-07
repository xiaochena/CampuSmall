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
    path: "/post",
    name: "post",
    component: () => import("../views/Post.vue"),
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
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login"),
  },
  {
    path: "/verify/:email",
    name: "Verify",
    component: () => import("../views/Verify.vue"),
    props: true,
  },
  {
    path: "/setting",
    name: "Setting",
    component: () => import("../views/Setting.vue"),
  },
  {
    path: "/certification",
    name: "Certification",
    component: () => import("../views/Certification.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
