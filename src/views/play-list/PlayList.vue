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
            <all-play-list
              @changeimg="changeimg"
              @setActiveImg="setActiveImg"
              @openToSongList="openToSongList"
              :currentIndex="currentIndex"
              :index="index"
              :item="item" />
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
  import AllPlayList from './AllPlayList'
  import {mapGetters} from 'vuex'
  export default {
    name: 'PlayList',
    components: {
      NavBar,
      TopScrollRecom,
      SongLabel,
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
          {name: '官方', hot: false},
          {name: '精品', hot: false},
          {name: '华语', hot: true},
          {name: '说唱', hot: false},
          {name: '流行', hot: true},
          {name: '民谣', hot: true},
          {name: '电子', hot: true}
        ],
        startX: 0,
        endX: 0,
        offsetX: 0,
        transX: 0,
        currentIndex: 0,
        touchW: 100,
        viewWidth: 0,
        startY: 0,
        endY: 0,
        offsetY: 0,
        swipeX: true,
        swipeY: true
      }
    },
    computed: {
      ...mapGetters(['getChangeIndex'])
    },
    created() {
      this.currentIndex = this.getChangeIndex
    },
    methods: {
      // 返回操作
      confirmBack() {
        this.$router.replace('/find')
      },
      // 设置背景图片，根据轮播图的滚动而展示背景图片
      setStyleBg() {
        this.style = document.createElement("style")
        document.head.appendChild(this.style)
        this.sheet = this.style.sheet
        this.sheet.insertRule(`.play-list::before { background: url(${this.activeBgUrl}) -136px 0px/ 100vh; transition: 1s; }`, 0)
      },
      // 切换图片后，展示不同图片
      changeimg(obj) {
        if(obj.bgUrl == this.bgUrl) return
        document.head.removeChild(this.style)
        this.style = null
        this.sheet = null
        // obj.bgUrl 中保存的是3d轮播图中的图片url，如果是通过切换标签展示的数据的时候，是只有 coverImgUrl 的，他们并不需要改变bgUrl
        if(obj.bgUrl) this.bgUrl = obj.bgUrl
        this.activeBgUrl = obj.bgUrl || obj.coverImgUrl
      },
      // 初次渲染的时候，展示中间一张图片作为背景
      setActiveImg(img) {
        this.activeBgUrl = this.bgUrl = img
      },
      // 展示所有的歌单分类标签
      showAllRecommend() {
        this.isShow = true
      },
      // 移动整个模块进行左右静态轮播图的切换
      ontouchstart(event) {
        this.startX = event.touches[0].pageX || event.touches[0].clientX
        this.startY =event.touches[0].pageY || event.touches[0].clientY
        this.$refs.swipe.style.transition = '0s'
        this.offsetY = this.offsetX = 0
        this.swipeY = this.swipeX = true
      },
      // 移动过程中，根据偏移量，去移动具体的宽度
      ontouchmove(event) {
        this.endX = event.touches[0].pageX || event.touches[0].clientX
        this.endY = event.touches[0].pageY || event.touches[0].clientY
        // 在前10px里判断是进行横向滑动还是上下滚动，如果是上下滚动，则将横向滑动的条件设置为 false，反之则将上下滚动的条件设置为 false
        if(this.swipeX && Math.abs(this.offsetX) - Math.abs(this.offsetY) > 10) {
          this.swipeY = false
          this.offsetY = 10000
        } else if(this.swipeY && Math.abs(this.offsetY) - Math.abs(this.offsetX) > 10) {
          this.swipeX = false
          this.offsetY = 10000
          return
        }
        // 如果是向左滑动，则 offsetX 值为正，反之则为负
        this.offsetX = this.startX - this.endX
        this.offsetY = this.startY - this.endY
        if(Math.abs(this.offsetX) < 10) return
        if((this.currentIndex <= 0 && this.offsetX <= 0) || (this.currentIndex >= this.myLabels.length-1 && this.offsetX > 0)) return
        if(this.offsetX > 0) {
          this.translateX(this.transX - this.offsetX + 10)
        } else {
          this.translateX(this.transX - this.offsetX - 10)
        }
      },
      // 移动结束之后，根据是否超过确认滑动的距离来判断是继续显示当前页还是展示其他的页
      ontouchend() {
        if((this.currentIndex <= 0 && this.offsetX <= 0) || (this.currentIndex >= this.myLabels.length-1 && this.offsetX > 0)) return
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
      // 设置滚动的距离的方法
      translateX(offset) {
        this.$refs.swipe.style.transform = `translateX(${offset}px)`
      },
      // 当除了滑动外，点击上方的滚动标签，切换至对应的页面
      setCurrentIndex(index) {
        this.currentIndex = index
      },
      // 打开歌单页面
      openToSongList(obj) {
        this.$store.commit('setListSongs', {obj: obj, flag: true, layout: 1})
      }
    },
    watch: {
      // 监听当前背景图片是否发生了改变，如果改变了，则需要重新设置背景图片
      activeBgUrl(val,oldVal) {
        if(this.style) {
          document.head.removeChild(this.style)
          this.style = null
          this.sheet = null
        }
        this.setStyleBg()
      },
      // 监听索引值是否改变，如果改变，则切换至对应的页面
      currentIndex(val,oldVal) {
        // 如果是从其他页面返回到推荐标签页面，那么需要将推荐页面中的轮播图中间的图片url传给 activeBgUrl来达到变换背景的效果
        if(val === 0) {
          this.activeBgUrl = this.bgUrl
        }
        this.transX = -this.viewWidth*val
        this.translateX(this.transX)
        this.$refs.swipe.style.transition = '.3s'
      }
    },
    mounted() {
      // 初次渲染的时候，保存当前页面的视口宽度，用于计算可滚动的区域的长度
      this.viewWidth =  window.innerWidth
      this.$refs.swipe.style.width = this.viewWidth * this.myLabels.length + 'px'
    },
    beforeDestroy() {
      this.$store.commit('changeIndex', 0)
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