<template>
  <div class="template">
    <p class='title'>
      <slot name="title">
        <span>小字</span>
      </slot>
    </p>
    <div class='text'>
      <div class='blod-title'>
        <slot name="icon"></slot>
        <slot name="blod">
          <span>加粗文字</span>
        </slot>
      </div>
      <div class='more' @click="upLoadMore">
        <div>
          <slot name="showMore">更多</slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'More',
    methods: {
      upLoadMore() {
        this.$emit('upLoadMore')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .title {
    color #ccc
    font-size 12px
  }
  .text {
    display flex
    algin-items center
    justify-content space-between
    margin-bottom 10px
  }
  .blod-title {
    font-weight 600
    color #666
    font-size 16px
    flex 80%
    overflow hidden
    white-space nowrap
    text-overflow ellipsis
    display flex
    align-items center
  }
  .more {
    flex 20%
    text-align right 
  }
  .more span{
    display inline-block
    padding 2px 4px
    font-size 12px
    color #666
    border 1px solid #666
    border-radius 12px
  }
</style>