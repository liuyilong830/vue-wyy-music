<template>
  <div id="app">
    <main-tab-bar v-show="$route.meta.showTabBar"></main-tab-bar>
    <keep-alive :exclude="['Login']">
      <router-view></router-view>
    </keep-alive>
    <player v-show="$route.meta.showPlayer"></player>
    <music-player v-if="getShow" v-model="getShow"></music-player>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/tabbar/MainTabBar'
  import Player from 'components/content/playing-song/Player.vue'
  import MusicPlayer from 'views/music-player/MusicPlayer'
  import {mapGetters} from 'vuex'
  export default {
    name: 'App',
    components: {
      MainTabBar,
      Player,
      MusicPlayer
    },
    data() {
      return {
        isShow: false
      }
    },
    computed: {
      ...mapGetters(['getShowMusicPlayer']),
      getShow() {
        return this.isShow = this.getShowMusicPlayer
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import url('http://at.alicdn.com/t/font_1668893_hjo75y2qtof.css');
</style>
