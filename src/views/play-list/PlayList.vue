<template>
  <div class="play-list" ref="playlist">
    <div class="mask">
      <nav-bar @confirmBack='confirmBack' class="nav-bar" ref="navbar">
        <template v-slot:left>
          <span class="iconfont icon-arrow-prev"></span>
        </template>
        <template v-slot:center>
          <span class="title">歌单广场</span>
        </template>
      </nav-bar>
  
      <top-scroll-recom @showAllRecommend="showAllRecommend"></top-scroll-recom>
      
      <router-view @changeimg="changeimg" @setActiveImg="setActiveImg"></router-view>
      
      <song-label v-model="isShow"></song-label>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TopScrollRecom from 'components/common/topx-scroll-recommend/TopScrollRecom'
  import SongLabel from './child/SongLabel'
  
  export default {
    name: 'PlayList',
    components: {
      NavBar,
      TopScrollRecom,
      SongLabel
    },
    data() {
      return {
        sheet: null,
        style: null,
        bgUrl: null,
        activeBgUrl: '',
        isShow: false
      }
    },
    methods: {
      confirmBack() {
        this.$router.back()
      },
      setStyleBg() {
        this.style = document.createElement("style")
        document.head.appendChild(this.style)
        this.sheet = this.style.sheet
        this.sheet.insertRule(`.play-list::before { background: url(${this.activeBgUrl}) -136px 0px/ 100vh }`, 0)
      },
      // 切换图片后，展示不同图片
      changeimg(obj) {
        document.head.removeChild(this.style)
        this.style = null
        this.sheet = null
        this.activeBgUrl = obj.bgUrl
      },
      setActiveImg(img) {
        this.activeBgUrl = img
      },
      // 展示所有的歌单分类
      showAllRecommend() {
        this.isShow = true
      }
    },
    watch: {
      activeBgUrl(val,oldVal) {
        this.setStyleBg()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .play-list {
    width: 100vw;
    height: 100vh;
    position relative
    overflow hidden
    .mask {
      width: 100%;
      height: 100%;
      background-color rgba(255,255,255,.8)
    }
  }
  .play-list:before {
    filter blur(40px)
    position absolute
    width: 100vw;
    height: 100%;
    z-index -1
    content: '';
    transform: scale(1.2);
  }
  .nav-bar {
    background-color transparent
    color #292828
  }
</style>