<template>
  <div class="recommend-style" v-if="showStyleRem">
    <more @upLoadMore='upLoadMoreByStyle'>
      <template v-slot:title>
        <span>风格推荐</span>
      </template>
      <template v-slot:blod>
        <span class="name">{{playlists.name}}</span>
      </template>
      <template v-slot:showMore>
        <span>播放全部</span>
      </template>
    </more>

    <static-swipe class="static-swipe" :list='songDetail' @playsong="playsong"></static-swipe>
  </div>
  <van-skeleton v-else :row='6' :row-width='["20%","50%","100%","100%","60%","90%"]'></van-skeleton>
</template>

<script>
  import More from 'components/content/more/More'
  import StaticSwipe from 'components/content/static-swipe/StaticSwipe'
  import {Skeleton, Toast} from 'vant';
  export default {
    name: 'StyleRem',
    components: {
      More,
      StaticSwipe,
      VanSkeleton: Skeleton
    },
    data() {
      return {
        
      }
    },
    props: {
      playlists: {
        type: Object,
        default() {
          return {
            songObj: {}
          }
        }
      },
      songDetail: {
        type: Array,
        default() {
          return []
        }
      },
      styleRecomUrl: {
        type: Array,
        default() {
          return []
        }
      }
    },
    computed: {
      showStyleRem() {
        return Object.keys(this.playlists).length !== 0 && this.songDetail.length !== 0? true : false
      }
    },
    methods: {
      upLoadMoreByStyle() {},
      playsong(item, flag) {
        this.songObj = this.styleRecomUrl.find(val => val.id == item.id)
        if(!this.songObj.url) {
          Toast('此歌曲需要网易云音乐vip用户才能收听!')
          return
        }
        let detail = this.songDetail.find(val => val.id == item.id)
        this.$store.commit('setSongList', {songs: this.songDetail , songsDetail: this.styleRecomUrl})
        this.$store.commit('changeSongObj',this.songObj)
        // 显示音乐播放器
        if (!flag) return;
        this.$store.commit('showMusicPlayer', true)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .recommend-style {
    box-sizing border-box
    padding 0 15px
    margin 10px 0 0
    width 100vw
  }
  .recommend-style .name {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space nowrap
  }
  .static-swipe {
    width 100%
  }
</style>