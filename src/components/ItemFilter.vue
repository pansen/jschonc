<template>
  <li class="zt-item-filter">
    <label :for="value_['_id_']">nullable </label>
    <input type="checkbox" :id="value_['_id_']" v-model="value_._config_.nullable">
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
