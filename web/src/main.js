import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueLazyLoad from "vue-lazyload";

import "./cube-ui";
import "amfe-flexible";
import http from "./http";

Vue.use(VueLazyLoad);
Vue.config.productionTip = false;
Vue.prototype.$http = http;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
