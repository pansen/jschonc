<template>
  <layout name="LayoutDefault">
    <div class="hello">
      <h1>Enter some JSON ...</h1>
      <b-container class="bv-example-row">
        <b-row>
          <b-col><textarea
            :class="{ 'valid': json_is_valid, 'invalid': !json_is_valid }"
            v-model="$data.json_input"></textarea></b-col>
          <b-col>2 of 3</b-col>
          <b-col>3 of 3</b-col>
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

  const _data = {
    'json_input': '',
    'json_is_valid': true
  };

  @Component({
    components: {
      Layout
    },
    data() {
      return _data;
    },
    watch: {
      json_input (newVal, oldVal) {
        console.debug('JSON input: %o', newVal);
        try {
          const _json = JSON.parse(newVal);
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
    mounted (): void {
      console.debug('Got store with state: %o', store.state);
      const _json = JSON.stringify(store.state[ztTypes.JSON_INPUT]);
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

  textarea.valid {
    border: 1px solid #8fb974;
  }

  textarea.invalid {
    border: 1px solid #b95428;
  }
</style>
