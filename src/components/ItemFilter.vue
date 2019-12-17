<template>
  <li class="zt-item-filter">
    {{ $props.key_ }}:
    <span v-if="typeof $props.value_['_children_'] === 'undefined'">{{ $props.value_ }}</span>
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
    mounted() {
      console.debug('Mounted with: %o: %o', this.$props.key_, this.$props.value_)
    }
  })
  export default class ItemFilter extends Vue {
    @Prop() private key_!: string;
    @Prop() private value_!: string;
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
