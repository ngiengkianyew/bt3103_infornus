import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuefire from "vuefire";
import Chart from "chart.js";
import VueChartKick from "vue-chartkick";
import BootstrapVue from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(vuefire);
Vue.use(VueChartKick, { adapter: Chart });
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  template: "<App/>",
  components: { App }
});
