<template>
  <div class="djprogram" v-if="djprogram.length !== 0">
    <more @upLoadMore='upLoadMoreBySelect'>
      <template v-slot:title>
        <span></span>
      </template>
      <template v-slot:blod>
        <span>电台推荐</span>
      </template>
      <template v-slot:showMore>
        <span>查看更多</span>
      </template>
    </more>
  
    <play-list-det :recommend='djprogram'></play-list-det>
  </div>
</template>

<script>
  import More from 'components/content/more/More'
  import PlayListDet from 'components/content/playlist-detail/PlayListDet'
  export default {
    name: 'DjProgram',
    components: {
      More,
      PlayListDet
    },
    data() {
      return {}
    },
    props: {
      djprogram: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      upLoadMoreBySelect() {}
    }
  }
</script>

<style lang="stylus" scoped>
  .djprogram {
    width 100vw
    padding 0 15px
    box-sizing border-box
    margin 10px 0 20px
  }
</style>