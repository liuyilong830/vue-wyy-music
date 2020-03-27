<template>
  <li class="songs-item">
    <div class="song-info">
      <div class="song-name">
        <slot name="songName">
          <span>歌名</span>
        </slot>
      </div>
      <div class="author-info">
        <slot name="authorInfo">
          <span>作者</span>
        </slot>
      </div>
    </div>
    <div class="icon">
      <slot name="icon">
        <span class="iconfont icon-shipin"></span>
        <span class="iconfont icon-gengduo"></span>
      </slot>
    </div>
  </li>
</template>

<script>
  export default {
    name: 'SongsList',
    components: {},
    data() {
      return {}
    },
  }
</script>

<style lang="stylus" scoped>
  .songs-item {
    height: 50px;
    display flex
    justify-content space-between
    align-items center
    margin-bottom 10px
    .song-info {
      flex 85%
      height: 100%;
      display flex
      flex-direction column
      justify-content space-evenly
      .song-name {
        max-width 90%
        text-overflow ellipsis
        overflow hidden
        white-space nowrap
        font-size 16px
      }
      .author-info {
        font-size 12px
        color #9a9a9a
        max-width 80%
        text-overflow ellipsis
        overflow hidden
        white-space nowrap
      }
    }
    .icon {
      flex 15%
      height: 100%;
      display flex
      justify-content space-between
      align-items center
      .iconfont {
        font-size 23px
      }
    }
  }

</style>