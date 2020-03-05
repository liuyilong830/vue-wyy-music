<template>
  <div class="icon-item">
    <slot name="icon"></slot>
    <slot name="title"></slot>
  </div>
</template>

<script>
  export default {
    name: 'Icon',
    props: {
      classItem: {
        type: String,
        default() {
          return 'icon-meirituijian'
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .icon-item {
    flex 1
    display flex
    flex-direction column
    justify-content space-around
    align-items center
    height 100%
    font-size 12px
  }
  .icon-item .iconfont {
    font-size 31px
    color #fff
    background: linear-gradient(#ffb3c0, #ff1a1a);
    border-radius 50%
  }
</style>