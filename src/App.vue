<template>
  <div id="app">
    <main-tab-bar v-show="$route.meta.showTabBar"></main-tab-bar>
    <keep-alive :exclude="['Login','DailyRecommend','PlayList','Search']">
      <router-view></router-view>
    </keep-alive>
    <player v-show="$route.meta.showPlayer"></player>
    <music-player v-if="getShow" v-model="getShow"></music-player>
    <transition name="play-list">
      <play-list-songs v-model="getList.flag" v-if="getList.flag"></play-list-songs>
    </transition>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/tabbar/MainTabBar'
  import Player from 'components/content/playing-song/Player.vue'
  import MusicPlayer from 'views/music-player/MusicPlayer'
  import PlayListSongs from 'views/play-list/PlayListSongs'
  import {mapGetters} from 'vuex'
  export default {
    name: 'App',
    components: {
      MainTabBar,
      Player,
      MusicPlayer,
      PlayListSongs
    },
    data() {
      return {
        isShow: false,
        showSongsList: false
      }
    },
    computed: {
      ...mapGetters(['getShowMusicPlayer','getSongObj','getList']),
      getShow() {
        this.isShow = this.getShowMusicPlayer
        return this.isShow && Object.keys(this.getSongObj).length !== 0
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import url('http://at.alicdn.com/t/font_1668893_tyx0lyl6qe.css');
  #app {
    width: 100vw;
    height: 100vh;
    position relative
  }
  .play-list-enter, .play-list-leave-to {
    opacity: 0;
    transform: translate(0,60px);
  }
  .play-list-enter-active, .play-list-leave-active {
    transition: all .3s;
  }
</style>
