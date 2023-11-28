import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import ErrorView from "../views/ErrorView.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/analytics",
    name: "Analytics",
    component: () =>
      import(/* webpackChunkName: "Analytics" */ "../views/AnalyticsView.vue"),
  },
  {
    path: "*",
    name: "Not Found",
    component: ErrorView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// eslint-disable-next-line
router.beforeEach((to, from, next) => {
  store.commit("setPageLoadingState", true);
  next();
});

// eslint-disable-next-line
router.afterEach((to, from, next) => {
  store.commit("setPageLoadingState", false);
});

export default router;
