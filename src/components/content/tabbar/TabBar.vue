<template>
  <div class="tab-bar">
    <div class="left">
      <slot name="left">
        <i class="iconfont icon-hengxian"></i>
      </slot>
    </div>
    <div class="center">
      <slot name="item"></slot>
    </div>
    <div class="right">
      <slot name="right">
        <i class="iconfont icon-sousuo"></i>
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabBar',
    components: {
      
    }
  }
</script>

<style lang="stylus" scoped>
  .tab-bar {
    width 100vw
    height 49px
    background-color #fff
    display flex
    align-items center
    text-align center
    font-weight 500
    color #afafaf
    position fixed
    top 0
    z-index 99
  }
  .left, .right {
    flex 15%
  }
  .center {
    flex 70%
    display flex
    align-items center
  }
</style>