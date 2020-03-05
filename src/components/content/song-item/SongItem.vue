<template>
  <div class='item'>
    <div class='image'>
      <span class="comment-count">
        <slot name="count">
          <span>1000</span>
        </slot>
      </span>
      <slot name="image">
        <img src="" alt="">
      </slot>
    </div>
    <span class='describe'>
      <slot name="describe"></slot>
    </span>
  </div>
</template>

<script>
  export default {
    name: 'SongItem',
  }
</script>

<style lang="stylus" scoped>
  .item {
    display flex
    flex-direction column
    justify-content space-between
    // margin-right 7px
  }
  .image {
    width 100px
    height 100px
    position relative
  }
  .image img {
    width 100%
    border-radius 8px
  }
  .describe {
    width 100px
    line-height 15px
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 2; 
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  .comment-count {
    position absolute
    right 3px
    top 2px
    color #fff
  }
</style>