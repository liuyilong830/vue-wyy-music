<template>
  <div class="operation-song">
    <div class="operation-song-icon">
      <slot name="Move">
        <span class="iconfont icon-ttpodicon"></span>
      </slot>
    </div>
    <div class="operation-song-icon">
      <slot name="isBefore">
        <span class="iconfont icon-shangyishoushangyige"></span>
      </slot>
    </div>
    <div class="operation-song-icon">
      <slot name="isStop">
        <span class="iconfont icon-bofang4" v-if="start"></span>
        <span class="iconfont icon-bofang3" v-else></span>
      </slot>
    </div>
    <div class="operation-song-icon">
      <slot name="isNext">
        <span class="iconfont icon-shangyishoushangyige-copy"></span>
      </slot>
    </div>
    <div class="operation-song-icon">
      <slot name="isMore">
        <span class="iconfont icon-gengduo2"></span>
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'OperationSong',
    data() {
      return {
        start: true
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .operation-song {
    width 100vw
    height 90px
    box-sizing border-box
    padding 0 15px
    display flex
    align-items center
    text-align center
  }
  .operation-song-icon {
    flex 1
  }
  .operation-song-icon .iconfont {
    font-size 28px
    color #ffffff
  }
  .operation-song-icon .icon-bofang4, .operation-song-icon .icon-bofang3 {
    font-size 45px
  }
</style>