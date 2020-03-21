<template>
  <div class="navbar">
    <div class="left" @click="back">
      <slot name="left">
        <span class="iconfont icon-arrow-prev"></span>
      </slot>
    </div>
    <div class="center">
      <slot name="center">
        <span>默认文字</span>
      </slot>
    </div>
    <div class="right">
      <slot name="right">
        <span></span>
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NavBar',
    methods: {
      back() {
        this.$emit('confirmBack')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .navbar {
    background-color #fff
    width 100vw
    height 50px
    display flex
    align-items center
    box-sizing border-box
    padding 0 10px
  }
  .left, .right {
    flex 10%
  }
  .left .icon-arrow-prev {
    font-size 20px
  }
  .center {
    flex 80%
  }
  .center span {
    font-size 20px
  }
  .right {
    text-align center
  }
</style>