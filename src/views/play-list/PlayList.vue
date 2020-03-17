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
  
      <top-scroll-recom></top-scroll-recom>
      <play-scroll class="play-scroll" :bounce="false">
        <swiper3-d :topThree="getTopThree" v-if="getTopThree.length !== 0" @changeimg="changeimg"></swiper3-d>
      </play-scroll>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TopScrollRecom from 'components/common/topx-scroll-recommend/TopScrollRecom'
  import Swiper3D from './child/Swiper3D'
  import PlayScroll from "components/common/betterscroll/BScroll";
  
  // 网络请求相关api
  import {topPlayList} from 'api/api.js'
  export default {
    name: 'PlayList',
    components: {
      NavBar,
      TopScrollRecom,
      Swiper3D,
      PlayScroll
    },
    data() {
      return {
        count: 33,
        playList: [],
        sheet: null,
        style: null,
        bgUrl: null,
        activeBgUrl: ''
      }
    },
    computed: {
      getTopThree() {
        let arr = []
        if(this.playList.length !== 0) {
          arr = [this.playList[0],this.playList[1],this.playList[2]]
        }
        return arr
      },
      getBackgroundImg() {
        if(this.activeBgUrl !== '') {
          return this.activeBgUrl
        }
        return ''
      }
    },
    methods: {
      confirmBack() {
        this.$router.back()
      },
      asyncGetPlayList(num) {
        topPlayList(num).then(res => {
          if(res.code === 200) {
            this.playList = res.playlists
            this.activeBgUrl = res.playlists[0].coverImgUrl
          }
        })
      },
      setStyleBg() {
        this.style = document.createElement("style")
        document.head.appendChild(this.style)
        this.sheet = this.style.sheet
        this.bgUrl = this.getBackgroundImg
        this.sheet.insertRule(`.play-list::before { background: url(${this.bgUrl}) -136px 0px/ 100vh }`, 0)
      },
      // 切换图片后，展示不同图片
      changeimg(obj) {
        document.head.removeChild(this.style)
        this.style = null
        this.sheet = null
        this.activeBgUrl = obj.bgUrl
      }
    },
    mounted() {
      this.asyncGetPlayList(this.count)
    },
    watch: {
      getBackgroundImg(val,oldVal) {
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
      background-color rgba(255,255,255,.4)
    }
  }
  .play-list:before {
    filter blur(20px)
    position absolute
    width: 100vw;
    height: 100%;
    z-index -1
    content: '';
    transform: scale(1.2);
  }
  .play-scroll {
    height: calc(100vh - 100px);
  }
  .nav-bar {
    background-color transparent
  }
</style>