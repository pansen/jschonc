<template>
  <layout name="LayoutDefault">
    <div class="hello">
      <h1>About</h1>
      <p>
        yo
      </p>
    </div>
  </layout>
</template>

<script>
  import Layout from '@/layouts/Layout.vue';

  export default {
    components: {
      Layout
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
