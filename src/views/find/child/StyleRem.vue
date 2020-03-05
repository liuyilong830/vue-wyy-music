<template>
  <div class="recommend-style">
    <more @upLoadMore='upLoadMoreByStyle'>
      <template v-slot:title>
        <span>歌曲推荐</span>
      </template>
      <template v-slot:blod>
        <span>根据无名之辈推荐</span>
      </template>
      <template v-slot:showMore>
        <span>播放全部</span>
      </template>
    </more>

  </div>
</template>

<script>
  import More from 'components/content/more/More'
  export default {
    name: 'StyleRem',
    components: {
      More
    },
    methods: {
      upLoadMoreByStyle() {

      }
    }
  }
</script>

<style lang="stylus" scoped>
  .recommend-style {
    box-sizing border-box
    padding 0 15px
    margin 10px 0 20px
    width 100vw
  }
</style>