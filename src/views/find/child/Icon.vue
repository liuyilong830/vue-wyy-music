<template>
  <div class="icon">
    <div class="icon-item">
      <div class="iconfont icon-meirituijian"></div>
      <span>每日推荐</span>
    </div>
    <div class="icon-item">
      <div class="iconfont icon-gedan"></div>
      <span>歌单</span>
    </div>
    <div class="icon-item">
      <div class="iconfont icon-paixingbang-copy"></div>
      <span>排行榜</span>
    </div>
    <div class="icon-item">
      <div class="iconfont icon-diantai"></div>
      <span>电台</span>
    </div>
    <div class="icon-item">
      <div class="iconfont icon-zhibo"></div>
      <span>直播</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Icon',
  }
</script>

<style lang="stylus" scoped>
  .icon {
    box-sizing border-box
    padding 0 15px
    width 100vw
    height 60px
    display flex
    align-items center
    margin 10px 0
  }
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