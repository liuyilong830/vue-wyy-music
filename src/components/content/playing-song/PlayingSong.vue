<template>
  <div class="playing-song">
    <div class="describe-playing">
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
        <slot name="changeIcon">
          <span class="iconfont icon-bofang2"></span>
        </slot>
        <span class="iconfont icon-gengduo2"></span>
      </div>
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
  }
  .describe-playing {
    height 100%
    display flex
    align-items center
  }
  .Album {
    width 40px
    box-sizing border-box
    padding 3px
    height 40px
    overflow hidden
  }
  .Album img {
    width 100%
    height 100%
    border-radius 50%
  }
  .playing-describe {
    width: calc(100vw - 40px - 75px);
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
    width 75px
    display flex
    justify-content space-around
  }
  .playing-status .iconfont {
    font-size 27px
  }
  .playing-status .icon-gengduo2 {
    font-size 26px
  }
</style>