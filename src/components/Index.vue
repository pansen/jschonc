<template>
  <layout name="LayoutDefault">
    <div class="hello">
      <h1>Enter some JSON ...</h1>
      <b-container class="bv-example-row">
        <b-row>
          <b-col>
            <div :class="{ 'valid': json_is_valid, 'invalid': !json_is_valid }">
            <textarea class="json_input"
            v-model="$data.json_input"></textarea>
            </div>
          </b-col>
          <b-col>
            <ItemFilters
              v-bind:object_="$data.json_parsed"
            ></ItemFilters>
          </b-col>
          <b-col>
            <OutputRenderer
              v-bind:object_="$data.json_processed"
            ></OutputRenderer>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </layout>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import Layout from '@/layouts/Layout.vue';
  import ztTypes from "@/types/actions";
  import {store} from "@/plugins/VuexPlugin";
  import ItemFilters from "@/components/ItemFilters.vue";
  import OutputRenderer from "@/components/OutputRenderer.vue";

  const _data = {
    'json_input': '',
    'json_parsed': {},
    'json_processed': {},
    'json_is_valid': true
  };

  @Component({
    components: {
      Layout,
      ItemFilters,
      OutputRenderer
    },
    data() {
      return _data;
    },
    watch: {
      json_input(newVal, oldVal) {
        console.debug('JSON input: %o', newVal);
        try {
          const _json = JSON.parse(newVal);
          _data.json_parsed = _json;
          _data.json_is_valid = true;
          store.commit(ztTypes.JSON_INPUT, _json);
        } catch (e) {
          console.log('invalid json: %o', e);
          _data.json_is_valid = false;
        }
      }
    },

  })
  export default class Index extends Vue {
    @Prop() private msg!: string;

    mounted(): void {
      // We commit here to enable the "post-processing" in the mutation
      store.commit(ztTypes.JSON_INPUT, {
        "a": 1,
        "b": 2,
        "c": {
          "ca": 142,
          "cb": 22,
          "cc": {
            "cca": 12,
            "ccb": 22,
          },
        },
      });
      _data.json_parsed = store.state[ztTypes.JSON_INPUT];
      _data.json_processed = store.state[ztTypes.JSON_PROCESSED];
      const _json = JSON.stringify(_data.json_parsed);
      console.log('mounted: %o', _json);
      _data.json_input = _json;
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  textarea.json_input {
    min-height: 300px;
    width: 95%;
  }

  div.valid {
    border: 2px solid #8fb974;
    padding-top: 8px;
  }

  div.invalid {
    border: 2px solid #b95428;
    padding-top: 8px;
  }
</style>
