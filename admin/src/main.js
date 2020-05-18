import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "./styles.scss";

import http from "./http";

Vue.use(ElementUI);
Vue.prototype.$http = http;

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
