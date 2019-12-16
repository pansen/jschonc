<script>
  // via: https://markus.oberlehner.net/blog/dynamic-vue-layout-components/#improve-bundle-size-with-dynamic-imports
  import Vue from 'vue';

  export default {
    name: 'Layout',
    props: {
      name: {
        type: String,
        required: true,
      },
    },
    created () {
      // Check if the layout component
      // has already been registered.
      if (!Vue.options.components[this.name]) {
        Vue.component(
            this.name,
            // TODO andi: no idea why this is `../`
            () => import(`../layouts/${this.name}.vue`),
        );
      }

      this.$parent.$emit('update:layout', this.name);
    },
    render () {
      console.log('`render` Layout: %o', this.name);
      return this.$slots.default[0];
    },
  };
</script>

<style scoped>

</style>
