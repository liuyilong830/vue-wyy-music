<template>
  <div class="scene-recommend" v-if="sceneRecom.length !== 0">
    <more @upLoadMore='upLoadMoreBySelect'>
      <template v-slot:title>
        <span>场景推荐</span>
      </template>
      <template v-slot:blod>
        <span class="blod-title-text">{{sceneRecom[0].description}}</span>
      </template>
      <template v-slot:showMore>
        <span>查看更多</span>
      </template>
    </more>

    <play-list-det :recommend='sceneRecom' @toSongsList="toSongsList"></play-list-det>
  </div>
</template>

<script>
  import More from 'components/content/more/More'
  import PlayListDet from 'components/content/playlist-detail/PlayListDet'
  export default {
    name: 'SceneRem',
    components: {
      More,
      PlayListDet
    },
    data() {
      return {
        list: [],
        name: '场景'
      }
    },
    props: {
      sceneRecom: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      upLoadMoreBySelect() {
        this.$store.commit('changeIndex', 1)
        this.$router.push('/playlist')
      },
      toSongsList(item) {
        this.$store.commit('setListSongs', {obj: item, flag: true, layout: 2})
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .scene-recommend {
    box-sizing border-box
    padding 0 15px
    margin 10px 0 20px
    width 100vw
  }
</style>