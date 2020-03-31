<template>
  <li class="songs-video">
    <div class="image">
      <slot name="image">
        <img src="" alt="">
      </slot>
      <div class="play-count">
        <slot name="play-count">
          <span>10万</span>
        </slot>
      </div>
    </div>
    <div class="info">
      <div class="title">
        <slot name="title">视频名</slot>
      </div>
      <div class="describe">
        <slot name="describe">视频描述</slot>
      </div>
    </div>
  </li>
</template>

<script>
  export default {
    name: 'SongsVideo',
    components: {},
    data() {
      return {}
    },
  }
</script>

<style lang="stylus" scoped>
  .songs-video {
    display flex
    align-items center
    justify-content space-between
    height: 70px;
    box-sizing border-box
    padding-bottom 10px
    .image {
      height: 100%;
      width: 110px;
      border-radius 4px
      overflow hidden
      position relative
      img {
        width: 100%;
        height: 100%;
        background-size cover
      }
      .play-count {
        position absolute
        right 2px
        top 0
        color #ffffff
      }
    }
    .info {
      height: 100%;
      width: calc(100% - 120px);
      box-sizing border-box
      .title {
        height: 70%;
        display flex
        font-size 15px
        color #666
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
      .describe {
        height: 30%;
        font-size 12px
        color #9a9a9a
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
    }
  }
</style>