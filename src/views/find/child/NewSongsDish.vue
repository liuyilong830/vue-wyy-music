<template>
  <div class="new-songs-dish" v-if="showStyleRem">
    <more @upLoadMore='upLoadMoreByStyle'>
      <template v-slot:title>
        <span>{{ time | getFormat}}</span>
      </template>
      <template v-slot:blod>
        <!-- <span class="name">{{playlists.name}}</span> -->
      </template>
      <template v-slot:showMore>
        <span>播放全部</span>
      </template>
    </more>

    <static-swipe class="static-swipe" :list='songDetail'></static-swipe>
  </div>
  <van-skeleton v-else :row='6' :row-width='["20%","50%","100%","100%","60%","90%"]'></van-skeleton>
</template>

<script>
  import More from 'components/content/more/More'
  import StaticSwipe from 'components/content/static-swipe/StaticSwipe'
  import { Skeleton } from 'vant';
  export default {
    name: 'NewSongsDish',
    components: {
      More,
      StaticSwipe,
      VanSkeleton: Skeleton
    },
    data() {
      return {
        time: ''
      }
    },
    props: {
      songDetail: {
        type: Array,
        default() {
          return []
        }
      }
    },
    filters: {
      getFormat(value) {
        var month = value.getMonth() + 1
        var day = value.getDay()
        return `${month}月${day}日`
      }
    },
    computed: {
      showStyleRem() {
        return this.songDetail.length !== 0? true : false
      }
    },
    methods: {
      upLoadMoreByStyle() {

      }
    },
    created() {
      this.time = new Date()
    }
  }
</script>

<style lang="stylus" scoped>
  .new-songs-dish {
    box-sizing border-box
    padding 0 15px
    margin 10px 0 0
    width 100vw
  }
  .new-songs-dish .name {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space nowrap
  }
  .static-swipe {
    width 100%
  }
</style>