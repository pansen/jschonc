import Vuex from 'vuex';
import Vue from "vue";
import _Vue from "vue";
import ztTypes from '@/types/actions';
import {Store} from "vuex";

Vue.config.productionTip = false;
if (process.env.NODE_ENV !== 'production') {
  Vue.config.devtools = true;
}

Vue.use(Vuex);

console.debug('creating a new Vuex.Store ...');
const store = new Vuex.Store({
  state: {
    [ztTypes.APP_DEBUG]: false,
    [ztTypes.JSON_INPUT]: {
      "a": 1,
      "b": 2,
      "c": {
        "ca": 12,
        "cb": 22,
      },
    },
  },
  // https://vuex.vuejs.org/guide/getters.html
  getters: {},
  mutations: {
    // reactive properties in Vuex: https://gist.github.com/DawidMyslak/2b046cca5959427e8fb5c1da45ef7748
    [ztTypes.APP_DEBUG](state, v) {
      Vue.set(state, ztTypes.APP_DEBUG, v);
    },
    [ztTypes.JSON_INPUT](state, v) {
      Vue.set(state, ztTypes.JSON_INPUT, v);
    },
  }
});

/**
 * We need to declare the type
 *
 * see: https://vuejs.org/v2/guide/typescript.html#Augmenting-Types-for-Use-with-Plugins
 */
declare module 'vue/types/vue' {
  interface Vue {
    $store: Store<any>
  }
}
/**
 * Plugin to inject the shared Vuex instance to all Vue instances we create.
 *
 * see:
 * - https://alligator.io/vuejs/creating-custom-plugins/
 */
const VuexPlugin = function VuexPlugin(vue: typeof _Vue, options?: any): void {
  console.debug('Assign store with state: %o', store.state);
  vue.prototype.$store = store;
};


export {VuexPlugin, store};
