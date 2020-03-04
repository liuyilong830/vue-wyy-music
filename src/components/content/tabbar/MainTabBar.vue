<template>
  <tab-bar>
    <template v-slot:item>
      <tab-bar-item path='/profile'>我的</tab-bar-item>
      <tab-bar-item path='/find'>发现</tab-bar-item>
      <tab-bar-item path='/cloud'>云村</tab-bar-item>
      <tab-bar-item path='/video'>视频</tab-bar-item>
    </template>
  </tab-bar>
</template>

<script>
  import TabBar from 'components/content/tabbar/TabBar'
  import TabBarItem from './TabBarItem'
  export default {
    name: 'MainTabBar',
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>
  
</style>