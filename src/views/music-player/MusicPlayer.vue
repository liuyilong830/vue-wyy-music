<template>
  <div class="musicPlayer" v-if="getPlayingSong.length !== 0" ref="musicPlayer">
    <nav-bar @confirmBack='confirmBack' class="nav-bar">
      <template v-slot:left>
        <span class="iconfont icon-arrow-prev"></span>
      </template>
      <template v-slot:center>
        <div class="flex">
          <span class="title">{{getShowSong[0].name}}</span>
          <p class="artists">{{getShowSong[0].artists[0].name}} ></p>
        </div>
      </template>
      <template v-slot:right>
        <span class="iconfont icon-fenxiang1"></span>
      </template>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import {mapGetters} from 'vuex'
  export default {
    name: 'MusicPlayer',
    components: {
      NavBar
    },
    data() {
      return {
        bgUrl: '',
        sheet: null,
        style: null
      }
    },
    computed: {
      ...mapGetters(['getPlayingSong','getSongsDetail','getSongObj','getShowSong'])
    },
    methods: {
      confirmBack() {
        this.$router.go(-1)
      },
      // 改变伪元素样式，用来设置高斯模糊的图片壁纸
      setStyleBg() {
        this.style = document.createElement("style")
        document.head.appendChild(this.style)
        this.sheet = this.style.sheet
        this.bgUrl = this.getShowSong[0].album.blurPicUrl
        this.sheet.insertRule(`.musicPlayer::before { background: url(${this.bgUrl}) -136px 0px/ 100vh }`, 0)
      }
    },
    mounted() {
      this.setStyleBg()
    },
    destroyed() {
      document.head.removeChild(this.style)
      this.style = null
    },
    watch: {
      getSongObj() {
        this.setStyleBg()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .musicPlayer {
    width 100%
    height 100%
    position fixed
    top 0
    z-index 1000
  }
  .musicPlayer::before {
    content ''
    filter: blur(10px);
    position: absolute;
    z-index -1
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    transform: scale(1.2)
  }
  .musicPlayer .nav-bar {
    background-color transparent
  }
  .title, .icon-arrow-prev {
    color #ffffff
  }
  .title {
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 1; 
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  .flex {
    display flex
    flex-direction column
    justify-content space-evenly
  }
  .flex .artists {
    font-size 13px
  }
  .musicPlayer .icon-fenxiang1 {
    font-size 33px
    color #ffffff
  }
</style>