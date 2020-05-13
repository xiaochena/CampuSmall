import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueLazyLoad from "vue-lazyload";
import VueQuillEditor from "vue-quill-editor";

// require styles 引入样式
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import "./cube-ui";
import "amfe-flexible";
import http from "./http";

Vue.use(VueLazyLoad);
Vue.use(VueQuillEditor);

Vue.config.productionTip = false;
Vue.prototype.$http = http;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
