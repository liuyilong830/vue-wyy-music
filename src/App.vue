<template>
  <div id="app">
    <main-tab-bar v-show="$route.meta.showTabBar"></main-tab-bar>
    <keep-alive :exclude="['Login']">
      <router-view></router-view>
    </keep-alive>
    <player v-show="$route.meta.showPlayer"></player>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/tabbar/MainTabBar'
  import Player from 'components/content/playing-song/Player.vue'
  export default {
    name: 'App',
    components: {
      MainTabBar,
      Player
    }
  }
</script>

<style lang="stylus" scoped>
  @import url('http://at.alicdn.com/t/font_1668893_9zolk5uyqaw.css');
</style>
