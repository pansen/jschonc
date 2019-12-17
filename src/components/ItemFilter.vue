<template>
  <li class="zt-item-filter">
    {{ key_ }}:
    <span v-if="typeof value_['_children_'] === 'undefined'">{{ value_.value }}</span>
    <ul v-if="typeof value_['_children_'] !== 'undefined'" class="zt-item-filter nested">
      <ItemFilter
        v-for="(v, k, index ) in value_._children_"
        :key="k"
        v-bind:index="index"
        v-bind:key_="k"
        v-bind:value_="v"
      ></ItemFilter>
    </ul>
  </li>
</template>

<script>
  import Vue from 'vue';

  const _data = {
    'key': '',
    'value': {},
  };

  export default {
    name: 'ItemFilter',
    props: {
      key_: {
        required: true
      },
      value_: {
        required: true
      },
    },
    data () {
      return _data
    },
    watch: {
      key_ (newVal, oldVal) {
        if (oldVal) {
          console.debug('[ItemFilter] new value for key_: %o (%o)', newVal, oldVal);
        }
        Vue.set(_data, 'key', newVal);
      },
      value_ (newVal, oldVal) {
        if (oldVal) {
          console.debug('[ItemFilter] new value for value_: %o (%o)', newVal, oldVal);
        }
        Vue.set(_data, 'value', newVal);
      },
    },
    // mounted(){
    //   Vue.set(_data, 'key', this.$props.key_);
    //   Vue.set(_data, 'value', this.$props.value_);
    // }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  li.zt-item-filter {
    list-style: none;
    text-align: left;
  }

  ul.zt-item-filter.nested {
    padding-left: 5px;
  }
</style>
