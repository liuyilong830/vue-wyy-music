<template>
  <div class="operation">
    <div class="icon-item" @click="likeSongClick">
      <span class="iconfont icon-xinaixin" v-if="!likeFlag"></span>
      <span class="iconfont icon-xinaixin1" v-else></span>
    </div>
    <div class="icon-item">
      <span class="iconfont icon-xiazai"></span>
    </div>
    <div class="icon-item">
      <span class="iconfont icon-vip"></span>
    </div>
    <div class="icon-item" @click.stop="openComment">
      <span class="iconfont icon-pinglun"></span>
    </div>
    <div class="icon-item">
      <span class="iconfont icon-iconfont"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Operation',
    data() {
      return {
        likeFlag: false
      }
    },
    methods: {
      likeSongClick() {
        this.likeFlag = !this.likeFlag
      },
      openComment() {
        this.$emit('openComment')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .operation {
    width 100vw
    height 70px
    box-sizing border-box
    padding 0 15px
    display flex
    justify-content space-around
    align-items center
    position absolute
    bottom 0px
  }
  .operation .icon-item {
    flex 1
    text-align center
  }
  .icon-item .iconfont {
    font-size 26px
    color #ccc
  }
  .icon-item .icon-xiazai, .icon-item .icon-vip, .icon-item .icon-iconfont {
    font-size 29px
  }
  .icon-item .icon-xinaixin1 {
    color #f72525
  }
</style>