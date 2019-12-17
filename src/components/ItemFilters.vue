<template>
  <div class="zt-item-filters">
    <ul class="zt-item-filter">
      <ItemFilter
        v-for="(v, k, index ) in nestedObject"
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

  function buildNested(obj) {
    const _nested = {};
    for (const k in obj) {
      const v = obj[k];

      if (typeof v === 'object') {
        _nested[k] = {
          '_children_': buildNested(v)
        }
      } else {
        _nested[k] = v;
      }
    }
    return _nested;
  }

  @Component({
    components: {
      ItemFilter
    },
    computed: {
      nestedObject: function () {
        return buildNested(this.$props.object_);
      }
    }
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
