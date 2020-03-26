<template>
  <div class="recommend" v-if="recommend.length !== 0">
    <more @upLoadMore='upLoadMoreBySelect'>
      <template v-slot:title>
        <span>推荐歌单</span>
      </template>
      <template v-slot:blod>
        <span>为你精挑细选</span>
      </template>
      <template v-slot:showMore>
        <span>查看更多</span>
      </template>
    </more>
    <play-list-det :recommend='recommend' @toSongsList="toSongsList"></play-list-det>
  </div>
</template>

<script>
  import More from 'components/content/more/More'
  import PlayListDet from 'components/content/playlist-detail/PlayListDet'
  import PlayListSongs from 'views/play-list/PlayListSongs'
  export default {
    name: 'Recommend',
    components: {
      More,
      PlayListDet,
      PlayListSongs
    },
    props: {
      recommend: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {}
    },
    methods: {
      upLoadMoreBySelect() {
        this.$router.push('/playlist')
      },
      toSongsList(item) {
        this.$store.commit('setListSongs', {obj: item, flag: true, layout: 1})
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .recommend {
    width 100vw
    padding 0 15px
    box-sizing border-box
    margin 10px 0 20px
  }
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