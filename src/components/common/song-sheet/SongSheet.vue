<template>
  <li class="song-sheet">
    <div class="image">
      <slot name="image">
        <img src="" alt="">
      </slot>
    </div>
    <div class="info">
      <div class="title">
        <slot name="title">歌单名</slot>
      </div>
      <div class="describe">
        <slot name="describe">歌单描述</slot>
      </div>
    </div>
  </li>
</template>

<script>
  export default {
    name: 'SongSheet',
    components: {},
    data() {
      return {}
    },
  }
</script>

<style lang="stylus" scoped>
  .song-sheet {
    display flex
    align-items center
    justify-content space-between
    height: 70px;
    box-sizing border-box
    padding-bottom 10px
    .image {
      height: 100%;
      width: 60px;
      border-radius 4px
      overflow hidden
      img {
        width: 100%;
        height: 100%;
        background-size cover
      }
    }
    
    .info {
      height: 100%;
      width: calc(100% - 70px);
      box-sizing border-box
      .title {
        height: 50%;
        display flex
        font-size 16px
        color #666
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
      .describe {
        height: 50%;
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