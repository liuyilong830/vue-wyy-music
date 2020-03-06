<template>
  <div class="song" ref="song">
    <div class="picimg">
      <slot name="img">
        <img src="" alt="">
      </slot>
    </div>
    <div class="song-describe">
      <div class="song-name"><slot name="songName">目不转睛</slot></div>
      <p class="artists">
        <slot name="artists">
          <span>王以太</span>-<span>中国新说唱第七期</span>
        </slot>
      </p>
    </div>
    <div class="btn">
      <span class="iconfont icon-shipin"></span>
      <span class="iconfont icon-gengduo"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Song',
    props: {
      songItem: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .song {
    width 100vw
    height 50px
    display flex
    align-items center
    box-sizing border-box
    padding 0 15px
  }
  .picimg {
    flex 12%
    height 40px
  }
  .picimg img {
    width 100%
    border-radius 4px
  }
  .song-describe {
    flex 73%
    display flex
    flex-direction column
    justify-content space-evenly
    padding-left 5px
  }
  .song-name {
    font-size 16px
    color black 
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 1; 
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  .artists {
    font-size 13px
    color #a5a2a2
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 1; 
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  .btn {
    flex 15%
    display flex
    justify-content space-evenly
  }
  .iconfont {
    font-size 20px
  }
</style>