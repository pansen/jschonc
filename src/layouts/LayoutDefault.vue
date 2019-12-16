<template>
  <div class="LayoutDefault">
    <nav class="LayoutDefault__nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
    </nav>
    <main class="LayoutDefault__main">
      <slot/>
    </main>
    <footer class="LayoutDefault__footer">
      &copy; Awesome Company
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'LayoutDefault',
    // TODO andi: none of the lifecycle methods are called, only the tempate is used
  }
</script>

<style scoped>

</style>
