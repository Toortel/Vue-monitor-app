import Vue from "vue";
import App from "./App.vue";
import i18n from "./locales/i18n";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

new Vue({
  data: { loading: false },
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
