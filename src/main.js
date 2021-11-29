import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { BootstrapVue } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import VueMask from 'v-mask';
Vue.use(VueMask);

Vue.use(BootstrapVue);

import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

import money from 'v-money'
 
// register directive v-money and component <money>
Vue.use(money, {precision: 4})

/*
import { Datetime } from 'vue-datetime'
// You need a specific loader for CSS files
import 'vue-datetime/dist/vue-datetime.css'
 
Vue.use(Datetime)

import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

 
Vue.component('datetime', Datetime);
*/
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
