<template>
  <div>
    {{ $props.key_ }}: {{ $props.value_ }}
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component({})
  export default class ItemFilter extends Vue {
    @Prop() private key_!: string;
    @Prop() private value_!: string;
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
