import Vuex from 'vuex';
import Vue from 'vue';
import ztTypes from '@/types/actions';
import {buildJsonProcessed} from '../lib/structure';

Vue.config.productionTip = false;
if (process.env.NODE_ENV !== 'production') {
  Vue.config.devtools = true;
}

Vue.use(Vuex);


const store = new Vuex.Store({
  state: {
    [ztTypes.APP_DEBUG]: false,
    [ztTypes.JSON_PARSED]: {},
  },
  // https://vuex.vuejs.org/guide/getters.html
  getters: {
  },
  mutations: {
    // reactive properties in Vuex: https://gist.github.com/DawidMyslak/2b046cca5959427e8fb5c1da45ef7748
    [ztTypes.APP_DEBUG] (state, v) {
      Vue.set(state, ztTypes.APP_DEBUG, v);
    },
    [ztTypes.JSON_PARSED] (state, v) {
      // console.debug('Setting state for: %o: %o', ztTypes.JSON_PARSED, v);
      Vue.set(state, ztTypes.JSON_PARSED, v);

      // TODO andi: avoid x-references - does this make sense here?
      this.commit(ztTypes.JSON_PROCESSED, JSON.parse(JSON.stringify(buildJsonProcessed(v))));
    },
    [ztTypes.JSON_PROCESSED] (state, v) {
      // console.debug('Setting state for: %o: %o', ztTypes.JSON_PROCESSED, v);
      Vue.set(state, ztTypes.JSON_PROCESSED, v);
    },
  }
});

/**
 * Plugin to inject the shared Vuex instance to all Vue instances we create.
 *
 * see:
 * - https://alligator.io/vuejs/creating-custom-plugins/
 */
const VuexPlugin = {
  // The install method is all that needs to exist on the plugin object.
  // It takes the global Vue object as well as user-defined options.
  install (Vue, options) {
    console.debug('Attach $store to Vue prototype ...');
    Vue.prototype.$store = store;
  }
};


export {VuexPlugin, store};
