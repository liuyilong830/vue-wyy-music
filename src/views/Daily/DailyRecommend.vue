<template>
  <div class="daily-recommend">
    <nav-bar @confirmBack='confirmBack' class="nav-bar" ref="navbar">
      <template v-slot:left>
        <span class="iconfont icon-arrow-prev"></span>
      </template>
      <template v-slot:center>
        <span v-show="titleFlag" class="title">每日推荐</span>
      </template>
      <template v-slot:right>
        <span class="iconfont icon-wenti" v-show="titleFlag"></span>
      </template>
    </nav-bar>
    <!-- 这里的是伪造的吸顶元素 -->
    <div class="position" v-show="isShow">
      <div class="image">
        <img src="~assets/images/recommend.jpg" ref="mask2" alt="">
      </div>
      <div class="contain-top">
        <p class="playAll">
          <span class="iconfont icon-bofang"></span>
          <span>播放全部</span>
        </p>
        <p class="selected-more">
          <span class="iconfont icon-sanhengxian"></span>
          <span>多选</span>
        </p>
      </div>
    </div>

    <b-scroll class="daily-scroll" :bounce='false' :probeType='3' @positionY='positionY'>
      <div class="image">
        <img src="~assets/images/recommend.jpg" ref="mask" alt="">
      </div>
      
      <div class="contain" ref="content">
        <div class="contain-top" ref="containTop">
          <p class="playAll">
            <span class="iconfont icon-bofang"></span>
            <span>播放全部</span>
          </p>
          <p class="selected-more">
            <span class="iconfont icon-sanhengxian"></span>
            <span>多选</span>
          </p>
        </div>
        <div v-show="!load">
          <song v-for="(item,index) in songs" :key="index" ref="song">
            <template v-slot:img>
              <img :src="item.album.blurPicUrl" alt="">
            </template>
            <template v-slot:songName>{{item.name}}</template>
            <template v-slot:artists>
              <span>{{item.artists[0].name}}</span>-<span>{{item.album.name}}</span>
            </template>
          </song>
        </div>
        
        <van-loading type="spinner" v-show="load"/>
      </div>
    </b-scroll>

    <playing-song v-if="songs.length !== 0">
      <template v-slot:Album>
        <img :src="songs[0].album.blurPicUrl" alt="">
      </template>
      <template v-slot:songName>
        {{songs[0].name}}
      </template>
    </playing-song>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import BScroll from 'components/common/betterscroll/BScroll'
  import SongScroll from 'components/common/betterscroll/BScroll'
  import Song from 'components/content/song/Song'
  import PlayingSong from 'components/content/playing-song/PlayingSong'
  import { Loading } from 'vant'

  import {dailySongs} from 'api/api.js'
  export default {
    name: 'DailyRecommend',
    components: {
      NavBar,
      BScroll,
      Song,
      SongScroll,
      VanLoading: Loading,
      PlayingSong
    },
    model: {
      prop: 'val1',
      event: 'click'
    },
    data() {
      return {
        titleFlag: false,
        offsetY: 0,
        topY: 0,
        navbarH: 0,
        opacity: 0,
        songs: [],
        isShow: false,
        load: true,
        height: 0
      }
    },
    computed: {
      
    },
    methods: {
      confirmBack() {
        this.$router.go(-1)
      },
      positionY(position) {
        this.offsetY = - position.y
      },
      getHeight(length) {
        this.height = this.$refs.song[0].$el.getBoundingClientRect().height
        return length* this.height + this.$refs.containTop.getBoundingClientRect().height + 'px'
      }
    },
    watch: {
      offsetY(val,oldVal) {
        if(val > oldVal) {
          if(val >= this.topY - this.navbarH) {
            this.isShow = true
            this.titleFlag = true
            this.opacity = 4
          } else {
            this.opacity += 4/(this.topY - this.navbarH)
          }
        } else if(val < oldVal) {
          if(val <= 0) {
            this.opacity = 0
          } else {
            this.opacity -= 4/(this.topY - this.navbarH)
          }
        }
        if(val > 0 && val < this.topY - this.navbarH) {
          this.isShow = false
          this.titleFlag = false
        }
        this.$refs.mask.style.filter = `blur(${this.opacity}px)`
        this.$refs.mask2.style.filter = `blur(${this.opacity}px)`
      }
    },
    mounted() {
      this.topY = this.$refs.content.getBoundingClientRect().top
      this.navbarH = this.$el.children[0].getBoundingClientRect().height
      dailySongs().then(res => {
        if(res.code === 200) {
          this.load = false
          this.songs = res.recommend
          this.$nextTick(() => {
            this.$refs.content.style.height = this.getHeight((res.recommend.length+1))
          })
        }
      })
    }
  }
</script>

<style lang="stylus" scoped>
  .daily-recommend {
    width 100vw
    height 100vh
    position fixed
    z-index 999
    top 0
    overflow hidden
  }
  .daily-recommend .nav-bar {
    background-color transparent
    position fixed
    top 0px
    z-index 9
  }
  .icon-arrow-prev, .title {
    color #ffffff
  }
  .daily-scroll {
    height 100vh
    position relative
  }
  .image {
    width 100%
    height 170px
  }
  .image img {
    position absolute 
    filter: blur(0px);
    z-index -2
  }
  .contain {
    border-top-left-radius 25px
    border-top-right-radius 25px
    background-color #fff
    width 100vw
    height: calc(100vh - 50px);
  }
  .contain-top {
    width 100vw
    height 50px
    background-color #fff
    display flex
    justify-content space-between
    align-items center
    box-sizing border-box
    padding 0 15px
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
  }
  .contain-top .playAll, .contain-top .selected-more {
    flex 1
  }
  .playAll {
    font-size 18px
    color black 
    font-weight 600
  }
  .icon-bofang {
    font-size 23px
    vertical-align middle
    font-weight 500
    padding-right 3px
  }
  .selected-more {
    text-align right
    font-size 15px
  }
  .song-list {
    width 100vw
    height: calc(100% - 50px);
    overflow auto
  }
  .songs-scroll {
    height: calc(100% - 50px);
  }
  .position {
    position fixed
    top -120px
    z-index: 8;
    overflow hidden
  }
  .van-loading {
    margin-top 30px
    display flex
    justify-content center
  }
  .icon-wenti {
    font-size 25px
    color #ffffff
  }
</style>