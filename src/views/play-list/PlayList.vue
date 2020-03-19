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
  
      <top-scroll-recom @showAllRecommend="showAllRecommend" @setCurrentIndex="setCurrentIndex" :list="myLabels" :currentIndex="currentIndex"></top-scroll-recom>
      
      <div class="swipe-wrapper">
        <div class="swipe" ref="swipe" @touchstart="ontouchstart" @touchmove="ontouchmove" @touchend="ontouchend">
          <div class="swipe-item" v-for="(item,index) in myLabels" :key="index">
            <all-play-list @changeimg="changeimg" @setActiveImg="setActiveImg" :item="item" />
          </div>
        </div>
      </div>
      
      <song-label v-model="isShow" :list="myLabels"></song-label>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TopScrollRecom from 'components/common/topx-scroll-recommend/TopScrollRecom'
  import SongLabel from './child/SongLabel'
  import PlayRecommend from './child/play-recommend/PlayRecommend'
  import PlayOfficial from './child/play-official/PlayOfficial'
  import PlayElectron from './child/play-electron/PlayElectron'
  import AllPlayList from './AllPlayList'
  export default {
    name: 'PlayList',
    components: {
      NavBar,
      TopScrollRecom,
      SongLabel,
      PlayRecommend,
      PlayOfficial,
      PlayElectron,
      AllPlayList
    },
    data() {
      return {
        sheet: null,
        style: null,
        bgUrl: null,
        activeBgUrl: '',
        isShow: false,
        myLabels: [
          {name: '推荐', hot: false},
          {name: '官方', hot: false},/*
          {name: '精品', hot: false},
          {name: '华语', hot: true},
          {name: '说唱', hot: false},
          {name: '流行', hot: true},
          {name: '民谣', hot: true},*/
          {name: '电子', hot: true}
        ],
        startX: 0,
        endX: 0,
        offsetX: 0,
        transX: 0,
        currentIndex: 0,
        touchW: 100,
        viewWidth: 0
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
      },
      ontouchstart(event) {
        this.startX = event.touches[0].pageX || event.touches[0].clientX
        this.$refs.swipe.style.transition = '0s'
      },
      ontouchmove(event) {
        this.endX = event.touches[0].pageX || event.touches[0].clientX
        // 如果是向左滑动，则 offsetX 值为正，反之则为负
        this.offsetX = this.startX - this.endX
        if((this.currentIndex <= 0 && this.offsetX <= 0) || (this.currentIndex >= this.$refs.swipe.children.length-1 && this.offsetX > 0)) return
        this.translateX(this.transX - this.offsetX)
      },
      ontouchend() {
        if((this.currentIndex <= 0 && this.offsetX <= 0) || (this.currentIndex >= this.$refs.swipe.children.length-1 && this.offsetX > 0)) return
        if(Math.abs(this.offsetX) >= this.touchW) {
          // 往左划动
          if(this.offsetX >= 0) {
            this.transX = -this.viewWidth*(this.currentIndex+1)
          // 往右划动
          }else {
            this.transX = -this.viewWidth*(this.currentIndex-1)
          }
          this.offsetX >= 0? this.currentIndex++ : this.currentIndex--
        }
        this.translateX(this.transX)
        this.$refs.swipe.style.transition = '.3s'
      },
      translateX(offset) {
        this.$refs.swipe.style.transform = `translateX(${offset}px)`
      },
      setCurrentIndex(index) {
        this.currentIndex = index
      }
    },
    watch: {
      activeBgUrl(val,oldVal) {
        this.setStyleBg()
      },
      currentIndex(val,oldVal) {
        this.transX = -this.viewWidth*(this.currentIndex)
        this.translateX(this.transX)
        this.$refs.swipe.style.transition = '.3s'
      }
    },
    mounted() {
      this.viewWidth =  window.innerWidth
      this.$refs.swipe.style.width = this.viewWidth * this.$refs.swipe.children.length + 'px'
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
      .swipe-wrapper {
        width: 100vw;
        height: calc(100vh - 90px);
        overflow hidden
        .swipe {
          width: 200vw;
          height: calc(100vh - 90px);
          .swipe-item {
            float left
          }
        }
      }
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