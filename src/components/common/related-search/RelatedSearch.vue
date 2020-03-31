<template>
  <li class="related">
    <slot name="keywords">
      <span>我的</span>
    </slot>
  </li>
</template>

<script>
  export default {
    name: 'RelatedSearch',
    components: {},
    data() {
      return {}
    },
  }
</script>

<style lang="stylus" scoped>
  .related {
    padding 2px 7px
    background-color #cccccc6b
    border-radius 10px
    margin-right 15px
    margin-bottom 10px
  }
</style>