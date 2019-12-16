<template>
  <layout name="LayoutDefault">
    <div class="hello">
      <h1>Enter some JSON ...</h1>
      <b-container class="bv-example-row">
        <b-row>
          <b-col><textarea v-model="$data.json_input"></textarea></b-col>
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

  const _data = {
    'json_input': '{}'
  };

  @Component({
    components: {
      Layout
    },
    data() {
      return _data;
    }
  })
  export default class Index extends Vue {
    @Prop() private msg!: string;
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
</style>
