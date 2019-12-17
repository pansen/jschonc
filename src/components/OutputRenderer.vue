<template>
  <div class="zt-output-renderer">
    <pre>{{ $props.object_ }}</pre>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  const _data = {
    json_processed: {}
  };

  @Component({})
  export default class OutputRenderer extends Vue {
    @Prop() private object_!: object;
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div.filters {
    border: 1px solid #efefef;
  }
</style>
