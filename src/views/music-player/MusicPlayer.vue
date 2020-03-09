<template>
  <div class="musicPlayer" v-if="getPlayingSong.length !== 0" ref="musicPlayer">
    <div class="music-contain">
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
      <div class="show">
        <div class="albumImg">
          <div class="mask">
            <div class="circular" ref="circular" :class="cdClass">
              <img :src="getShowSong[0].album.blurPicUrl" alt="">
            </div>
          </div>
        </div>
        <operation></operation>
      </div>
      <div class="hhhh">
        <progress-bar 
        @getTotalLength='getTotalLength' 
        :currentLength='currentLength' 
        @changeTime='changeTime' 
        @touchTime='touchTime'
        @endTime='endTime'>
          <template v-slot:startTime>
            <span>{{currentTime | getPlayTime}}</span>
          </template>
          <template v-slot:stopTime>
            <span>{{getShowSong[0].bMusic.playTime | getPlayTime}}</span>
          </template>
        </progress-bar>
        <operation-song class="operation-song">
          <template v-slot:Move>
            <span class="iconfont icon-ttpodicon" v-if="move == 1" @click="changeMove"></span>
            <span class="iconfont icon-danquxunhuan" v-else-if="move == 2" @click="changeMove"></span>
            <span class="iconfont icon-bofangye-caozuolan-suijibofang" v-else-if="move == 3" @click="changeMove"></span>
          </template>
          <template v-slot:isBefore>
            <span class="iconfont icon-shangyishoushangyige" @click="beforeClick"></span>
          </template>
          <template v-slot:isStop>
            <span class="iconfont icon-bofang4" @click="startOrstopSong" v-if="start"></span>
            <span class="iconfont icon-bofang3" @click="startOrstopSong" v-else></span>
          </template>
          <template v-slot:isNext>
            <span class="iconfont icon-shangyishoushangyige-copy" @click="nextClick"></span>
          </template>
          <template v-slot:isMore>
            <span class="iconfont icon-gengduo2"></span>
          </template>
        </operation-song>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Operation from './child/Operation'
  import ProgressBar from './child/ProgressBar'
  import OperationSong from './child/OperationSong'
  import {mapGetters} from 'vuex'
  export default {
    name: 'MusicPlayer',
    components: {
      NavBar,
      Operation,
      ProgressBar,
      OperationSong
    },
    data() {
      return {
        bgUrl: '',
        sheet: null,
        style: null,
        start: true,
        time: 0,
        currentLength: 0,
        allWidth: 0,
        flag: true,
        move: 1  // 1表示列表循环，2表示单曲循环，3表示随机播放
      }
    },
    computed: {
      ...mapGetters(['getPlayingSong','getSongsDetail','getSongObj','getShowSong','getSongFlag']),
      currentTime() {
        return this.time * 1000
      },
      // 音乐暂停的时候添加 play stop 类，音乐播放的时候添加 play 类
      cdClass() {
        return this.start? 'play' : 'play stop'
      }
    },
    filters: {
      getPlayTime(value) {
        var minutes = parseInt(value / 1000 / 60)
        var seconds = parseInt((value / 1000) % 60)
        if(minutes < 10) {
          minutes = '0'+minutes
        }
        if(seconds < 10) {
          seconds = '0'+seconds
        }
        return `${minutes}:${seconds}`
      }
    },
    methods: {
      confirmBack() {
        this.$router.go(-1)
      },
      changeMove() {
        this.move ++
        this.move = this.move > 3? 1 : this.move
        this.$store.commit('setSongFlag',{move: this.move})
      },
      startOrstopSong() {
        // 使用事件总线来控制player组件的播放和暂停
        this.$bus.$emit('startOrstopSong')
        this.start = !this.start
      },
      onTimeUpdate() {
        // 通过事件总线，获取歌曲当前播放的时间点
        this.$bus.$on('timeUpdate', (time) => {
          this.time = parseInt(time)
        })
      },
      getTotalLength(allWidth) {
        this.allWidth = allWidth
      },
      changeTime(currentW) {
        var time = currentW * (this.getShowSong[0].bMusic.playTime / 1000) / this.allWidth
        this.$bus.$emit('changeTime',time)
      },
      touchTime(length) {
        // 当用户拖动的时候，设置状态为false，这里设置状态的原因是为了当拖拽事件结束之后，可以监听状态的改变从而重新通过事件总线发起监听
        this.flag = false
        this.time = length * (this.getShowSong[0].bMusic.playTime / 1000) / this.allWidth
        // 在拖动的过程中要先关闭该事件总线，不然会存在一来一回的情况
        this.$bus.$off('timeUpdate')
      },
      endTime() {
        // 在拖动结束之后，发起改变时间的事件，同时将状态改回true
        this.$bus.$emit('changeTime',this.time)
        this.flag = true
      },
      beforeClick() {
        // 先获取当前播放音乐在歌曲列表中的索引位置
        var index = this.getPlayingSong.findIndex(item => item.id == this.getSongObj.id)
        // 通过事件总线，调用播放器的播放下一首函数
        this.$bus.$emit('beforeSong')
      },
      nextClick() {
        // 先获取当前播放音乐在歌曲列表中的索引位置
        var index = this.getPlayingSong.findIndex(item => item.id == this.getSongObj.id)
        // 通过事件总线，调用播放器的播放下一首函数
        this.$bus.$emit('nextSong')
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
      this.move = this.getSongFlag.move
      this.setStyleBg()
      this.onTimeUpdate()
      this.start = this.getSongFlag.btnFlag
      this.currentLength = this.getSongFlag.currentLength
      this.time = this.getSongFlag.currentTime
    },
    beforeDestroy() {
      document.head.removeChild(this.style)
      this.style = null
      this.$store.commit('setSongFlag',{currentLength: this.currentLength})
      this.$store.commit('setSongFlag',{currentTime: this.time})
    },
    watch: {
      getSongObj() {
        this.setStyleBg()
        this.start = true
      },
      time(val,oldVal) {
        this.currentLength = val * this.allWidth / (this.getShowSong[0].bMusic.playTime / 1000)
        if(val == parseInt((this.getShowSong[0].bMusic.playTime / 1000))) {
          this.start = false
        }
      },
      flag(val,oldVal) {
        // 判断状态如果是true的话，则重新发送事件总线监听
        if(val === true) {
          this.onTimeUpdate()
        }
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
    filter: blur(20px);
    position: absolute;
    z-index -1
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    transform: scale(1.2)
  }
  .music-contain {
    width 100vw
    height 100vh
    position relative
    background-color rgba(0,0,0,.6)
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
    color rgba(255,255,255,.8)
  }
  .musicPlayer .icon-fenxiang1 {
    font-size 33px
    color #ffffff
  }
  .albumImg {
    width 275px
    height 275px
    border-radius 50%
    background-color rgba(144,144,144,.5)
    margin 70px auto
    display flex
    align-items center
  }
  .mask {
    width 260px
    height 260px
    border-radius 50%
    background-color #232323
    margin 0 auto
    display flex
    align-items center
  }
  .circular {
    width 180px
    height 180px
    border-radius 50%
    margin 0 auto
    background-color #fff
    overflow hidden
  }
  .play {
    animation rotate 50s infinite linear
  }
  .stop {
    animation-play-state paused
  }
  @keyframes rotate {
    from {
      transform rotate(0deg)
    }
    to {
      transform rotate(360deg)
    }
  }
  .circular img {
    width 100%
  }
  .hhhh {
    width 100vw
    position absolute
    bottom 10px
  }
</style>