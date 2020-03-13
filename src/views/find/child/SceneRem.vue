<template>
  <div class="scene-recommend" v-if="sceneRecom.length !== 0">
    <more @upLoadMore='upLoadMoreBySelect'>
      <template v-slot:title>
        <span>场景推荐</span>
      </template>
      <template v-slot:blod>
        <span>{{sceneRecom[0].creator.signature}}</span>
      </template>
      <template v-slot:showMore>
        <span>查看更多</span>
      </template>
    </more>

    <play-list-det :recommend='sceneRecom'></play-list-det>
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
        list: []
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