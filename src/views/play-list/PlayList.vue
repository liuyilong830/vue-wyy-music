<template>
  <div class="play-list">
    <nav-bar @confirmBack='confirmBack' class="nav-bar" ref="navbar">
      <template v-slot:left>
        <span class="iconfont icon-arrow-prev"></span>
      </template>
      <template v-slot:center>
        <span class="title">歌单广场</span>
      </template>
    </nav-bar>
    
    <top-scroll-recom></top-scroll-recom>
    <swiper3-d></swiper3-d>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TopScrollRecom from 'components/common/topx-scroll-recommend/TopScrollRecom'
  import Swiper3D from './child/Swiper3D'
  export default {
    name: 'PlayList',
    components: {
      NavBar,
      TopScrollRecom,
      Swiper3D
    },
    data() {
      return {}
    },
    methods: {
      confirmBack() {
        this.$router.back()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .play-list {
    width: 100vw;
    height: 100vh;
  }
  .nav-bar {
    background-color transparent
  }
</style>