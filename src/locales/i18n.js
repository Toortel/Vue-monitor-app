import Vue from "vue";
import VueI18n from "vue-i18n";

import polish from "./polish";
import english from "./english";

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "pl",
  messages: {
    pl: polish,
    en: english,
  },
});

export default i18n;
