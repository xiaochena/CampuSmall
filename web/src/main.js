import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueLazyLoad from "vue-lazyload";

import "./cube-ui";
import "amfe-flexible";

Vue.use(VueLazyLoad);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
