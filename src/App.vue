<template>
  <div id="app">
    <main-tab-bar v-show="$route.meta.showTabBar"></main-tab-bar>
    <keep-alive :exclude="['Login']">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/tabbar/MainTabBar'
  export default {
    name: 'App',
    components: {
      MainTabBar
    }
  }
</script>

<style lang="stylus" scoped>
  @import url('http://at.alicdn.com/t/font_1668893_c7uxfk06mvm.css');
</style>
