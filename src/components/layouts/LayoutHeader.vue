<template>
  <header>
    <nav :class="color || 'blue'">
      <div class="nav-wrapper container">
        <a href="/" class="brand-logo">{{title || 'VUE SPA'}}</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <slot/>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'LayoutHeader',
  props: ['color', 'title'],
  data () {
    return {

    }
  }
}
</script>

<style scoped>

</style>
