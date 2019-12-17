import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import store from './store'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {VuexPlugin} from '@/plugins/VuexPlugin';
import Index from '@/components/Index.vue';
import About from '@/components/About.vue';

Vue.use(VuexPlugin);
Vue.use(BootstrapVue);

// This installs <router-view> and <router-link>,
// and injects $router and $route to all router-enabled child components
Vue.use(VueRouter);

Vue.config.productionTip = false;

const router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '/', component: Index},
    {path: '/about', component: About},
  ]
});

new Vue({
  store,
  render: h => h(App),
  router
}).$mount('#app');
