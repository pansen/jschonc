<template>
  <div class="zt-output-renderer">
    <pre>{{ rendered }}</pre>
  </div>
</template>

<script>
  import {renderDataClass, renderSchemaClass} from '../lib/render/marshmallow';

  export default {
    props: {
      object_: {
        required: true
      },
    },

    computed: {
      rendered () {
        return renderSchemaClass('MyFirstSonySchema', this.$props.object_, 0)
          + '\n'
          + renderDataClass('MyFirstSony', this.$props.object_, 0);
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div.filters {
    border: 1px solid #efefef;
  }

  div.zt-output-renderer pre {
    text-align: left;
  }
</style>
