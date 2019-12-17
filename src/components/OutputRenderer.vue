<template>
  <div class="zt-output-renderer">
    <pre>{{ rendered }}</pre>
  </div>
</template>

<script>
  function renderSchemaClass (className, jsonProcessed, indent) {
    const _intent = 4;
    let def = `${' '.repeat(indent * _intent)}from marshmallow import Schema, fields\n`;
    def += `${' '.repeat(indent * _intent)}class ${className}(Schema):\n`;
    for (const k in jsonProcessed) {
      const v = jsonProcessed[k];
      const required = v._config_.nullable ? 'False' : 'True';
      let fieldType;

      if (typeof v.value === "number") {
        if (typeof v.value === "number" && !Number.isInteger(v.value)) {
          fieldType = 'Float';
        } else {
          fieldType = 'Integer';
        }
      } else {
        fieldType = 'String';
      }
      def += `${' '.repeat((indent + 1) * _intent)}${k} = fields.${fieldType}(required=${required}, default='')\n`
    }
    return def
  }

  export default {
    props: {
      object_: {
        required: true
      },
    },

    computed: {
      rendered () {
        return renderSchemaClass('MyFirstSony', this.$props.object_, 0);
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
