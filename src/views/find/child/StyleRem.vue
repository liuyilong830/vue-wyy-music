<template>
  <div class="recommend-style" v-if="Object.keys(playlists).length !== 0">
    <more @upLoadMore='upLoadMoreByStyle'>
      <template v-slot:title>
        <span>风格推荐</span>
      </template>
      <template v-slot:blod>
        <span>{{playlists.name}}</span>
      </template>
      <template v-slot:showMore>
        <span>播放全部</span>
      </template>
    </more>

    <static-swipe class="static-swipe" :list='[0,1,2,3,4,5,6,7,8,9,10,11]'></static-swipe>
  </div>
</template>

<script>
  import More from 'components/content/more/More'
  import StaticSwipe from 'components/content/static-swipe/StaticSwipe'
  export default {
    name: 'StyleRem',
    components: {
      More,
      StaticSwipe
    },
    data() {
      return {
        
      }
    },
    props: {
      playlists: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      upLoadMoreByStyle() {}
    },
    mounted() {
      
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
  .static-swipe {
    width 100%
    height 180px
  }
</style>