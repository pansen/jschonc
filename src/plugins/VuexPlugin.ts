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

function buildNested(obj: object) {
  const _nested = {};
  for (const k in obj) {
    const v: any = obj[k];

    if (typeof v === 'object' && typeof v['_children_'] === 'undefined') {
      _nested[k] = {
        '_children_': buildNested(v),
        '_config_': {
          'nullable': false
        },
      }
    } else {
      _nested[k] = {
        'value': v,
        '_config_': {
          'nullable': false
        },
      };
    }
  }
  return _nested;
}


const store = new Vuex.Store({
  state: {
    [ztTypes.APP_DEBUG]: false,
    [ztTypes.JSON_INPUT]: {},
  },
  // https://vuex.vuejs.org/guide/getters.html
  getters: {},
  mutations: {
    // reactive properties in Vuex: https://gist.github.com/DawidMyslak/2b046cca5959427e8fb5c1da45ef7748
    [ztTypes.APP_DEBUG](state, v) {
      Vue.set(state, ztTypes.APP_DEBUG, v);
    },
    [ztTypes.JSON_INPUT](state, v) {
      console.debug('Setting state for: %o', ztTypes.JSON_INPUT);
      Vue.set(state, ztTypes.JSON_INPUT, v);
      this.commit(ztTypes.JSON_PROCESSED, buildNested(v));
    },
    [ztTypes.JSON_PROCESSED](state, v) {
      Vue.set(state, ztTypes.JSON_PROCESSED, v);
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
