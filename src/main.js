import Vue from 'vue';
import App from './App.vue';
import router from './router';
import mainStore from './store';
import Vuex from 'vuex';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import def from '@/mixins/default';

import $axios from '@/plugins/v-axios';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Добавляем модуль Vuex в приложение
Vue.use(Vuex);

// Добавляем модуль с компонентами и иконками в приложение Vue 
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

// Создаем глобальный store
const store = new Vuex.Store({
  modules: mainStore
});



Vue.config.productionTip = false

new Vue({
  router,
  store,
  mixins: [def],
  render: h => h(App)
}).$mount('#app')
