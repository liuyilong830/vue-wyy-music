<template>
  <div class="top-list" v-if="topList.length !== 0">
    <more @upLoadMore='upLoadMoreByStyle'>
      <template v-slot:title>
        <span>排行榜</span>
      </template>
      <template v-slot:blod>
        <span class="name">热歌导航指南</span>
      </template>
      <template v-slot:showMore>
        <span>查看更多</span>
      </template>
    </more>

    <rank-list :topList='topList' @openToPlayList="openToPlayList" @playsong="playsong"></rank-list>
  </div>
</template>

<script>
  import More from 'components/content/more/More'
  import RankList from 'components/content/rank-list/RankList'
  import {songDetail} from 'api/api.js'
  import {Toast} from "vant";
  export default {
    name: 'TopList',
    components: {
      More,
      RankList
    },
    props: {
      topList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        ids: [],
        songDet: [],
        songs: [],
        songObj: {},
        id: 0
      }
    },
    methods: {
      upLoadMoreByStyle() {},
      openToPlayList(item) {
        this.$store.commit('setListSongs', {obj: item, flag: true, layout: 1})
      },
      playsong(payload) {
        this.id = payload.obj.id
        this.songs = this.topList[payload.index].tracks
        this.ids = this.topList[payload.index].tracks.map(item => item.id)
        this.asyncgetSongsUrl(this.ids)
      },
      asyncgetSongsUrl(ids) {
        songDetail(ids).then(res => {
          if(res.code === 200) {
            for(let value of this.ids) {
              this.songDet.push(res.data.find(item => item.id === value))
            }
            this.songObj = this.songDet.find(item => this.id === item.id)
            if(!this.songObj.url) {
              Toast('此歌曲需要网易云音乐vip用户才能收听!')
              return
            }
            this.$store.commit('setSongList', {songs: this.songs, songsDetail: this.songDet})
            this.$store.commit('changeSongObj',this.songObj)
            // 显示音乐播放器
            this.$store.commit('showMusicPlayer', true)
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .top-list {
    box-sizing border-box
    padding 0 15px
    margin 10px 0 0
    width 100vw
  }
</style>