<template>
  <div class="zt-item-filters">
    <ul class="zt-item-filter">
      <ItemFilter
        v-for="(v, k, index ) in $props.object_"
        :key="k"
        v-bind:index="index"
        v-bind:key_="k"
        v-bind:value_="v"
      ></ItemFilter>
    </ul>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import ItemFilter from "@/components/ItemFilter.vue";

  @Component({
    components: {
      ItemFilter
    },
  })
  export default class ItemFilters extends Vue {
    @Prop() private object_!: object;
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div.filters {
    border: 1px solid #efefef;
  }
</style>
