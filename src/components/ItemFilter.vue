<template>
  <li class="zt-item-filter">
    <input type="checkbox" id="checkbox" v-model="$props.value_._config_.nullable">
    <label for="checkbox">{{ $props.value_._config_.nullable }}</label>
    {{ $props.key_ }}:
    <span v-if="typeof $props.value_['_children_'] === 'undefined'">{{ $props.value_.value }}</span>
    <ul v-if="typeof $props.value_['_children_'] !== 'undefined'" class="zt-item-filter nested">
      <ItemFilter
        v-for="(v, k, index ) in $props.value_._children_"
        :key="k"
        v-bind:index="index"
        v-bind:key_="k"
        v-bind:value_="v"
      ></ItemFilter>
    </ul>
  </li>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component({
  })
  export default class ItemFilter extends Vue {
    @Prop() private key_!: string;
    @Prop() private value_!: string;
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
