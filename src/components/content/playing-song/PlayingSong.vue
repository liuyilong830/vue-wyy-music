<template>
  <div class="playing-song">
    <div class="Album">
      <slot name="Album">
        <img src="" alt="">
      </slot>
    </div>
    <div class="playing-describe">
      <div class="song-name"><slot name="songName">目不转睛</slot></div>
      <p class="artists">
        <slot name="artists">
          <span>横滑可切换上下首哦</span>
        </slot>
      </p>
    </div>
    <div class="playing-status">
      <span class="iconfont icon-bofang2"></span>
      <span class="iconfont icon-gengduo2"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PlayingSong',
  }
</script>

<style lang="stylus" scoped>
  .playing-song {
    position fixed
    background-color rgba(255,255,255,.9)
    width 100vw
    height 45px
    bottom 0
    z-index 999
    box-shadow 0 -1px 3px #cccccc
    display flex
    align-items center
  }
  .Album {
    flex 10%
    box-sizing border-box
    padding 3px
    height 80%
  }
  .Album img {
    width 100%
    border-radius 50%
  }
  .playing-describe {
    flex 70%
    display flex
    flex-direction column
    justify-content space-evenly
    padding-left 5px
  }
  .song-name {
    font-size 15px
  }
  .artists {
    font-size 13px
    color #cccccc
  }
  .playing-status {
    flex 20%
    display flex
    justify-content space-around
  }
  .icon-bofang2, .icon-gengduo2 {
    font-size 27px
  }
</style>