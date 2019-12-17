<template>
  <div class="zt-output-renderer">
    <pre>{{ $props.object_ }}</pre>
  </div>
</template>

<script>

  export default {
    props: {
      object_: {
        required: true
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div.filters {
    border: 1px solid #efefef;
  }
</style>
