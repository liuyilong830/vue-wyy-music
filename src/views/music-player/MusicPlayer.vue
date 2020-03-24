<template>
  <div class="musicPlayer" ref="musicPlayer">
    <div class="music-contain">
      <nav-bar @confirmBack='confirmBack' class="nav-bar">
        <template v-slot:left>
          <span class="iconfont icon-arrow-prev"></span>
        </template>
        <template v-slot:center>
          <div class="flex">
            <span class="title">{{getShowSong[0].name}}</span>
            <p class="artists">{{getArtists}} ></p>
          </div>
        </template>
        <template v-slot:right>
          <span class="iconfont icon-fenxiang1"></span>
        </template>
      </nav-bar>
      <div class="normal">
        <div class="show" @click="showLyric" ref="show" :style="{visibility: getShowLyric}">
          <div class="albumImg">
            <div class="mask">
              <div class="circular" ref="circular" :class="cdClass">
                <img :src="getImgUrl" alt="">
              </div>
            </div>
          </div>
          <operation @openComment="openComment"></operation>
        </div>
        <lyric :lyric='lyric' :flag1='flag' ref="lyric" v-model='isShowLyric' v-bind:changeLyric.sync='changeLyric'></lyric>
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
            <span>{{getMusicTime | getPlayTime}}</span>
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
            <span class="iconfont icon-bofang4" @click="startOrstopSong" v-if="getSongFlag.btnFlag"></span>
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
  
    <transition name="list">
      <comment v-model="showComment" v-if="showComment" :songId="getSongObj.id"></comment>
    </transition>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Operation from './child/Operation'
  import ProgressBar from './child/ProgressBar'
  import OperationSong from './child/OperationSong'
  import Lyric from './child/Lyric'
  import Comment from './child/Comment'
  import {mapGetters} from 'vuex'
  import {getLyric,getComment} from 'api/api.js'
  export default {
    name: 'MusicPlayer',
    components: {
      NavBar,
      Operation,
      ProgressBar,
      OperationSong,
      Lyric,
      Comment
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
        move: 1,  // 1表示列表循环，2表示单曲循环，3表示随机播放
        isShowLyric: false, // 是否显示歌词
        lyric: {},
        changeLyric: false,
        showComment: false
      }
    },
    model: {
      prop: 'val1',
      event: 'chick'
    },
    computed: {
      ...mapGetters(['getPlayingSong','getSongsDetail','getSongObj','getShowSong','getSongFlag']),
      currentTime() {
        return this.time * 1000
      },
      // 音乐暂停的时候添加 play stop 类，音乐播放的时候添加 play 类
      cdClass() {
        return this.start? 'play' : 'play stop'
      },
      // 旋转cd和歌词的显示和隐藏
      getShowLyric() {
        return this.isShowLyric? 'hidden' : 'visible'
      },
      // 获取背景图片
      getImgUrl() {
        if(this.getShowSong[0].album) {
          return this.getShowSong[0].album.blurPicUrl
        } else if(this.getShowSong[0].al) {
          return this.getShowSong[0].al.picUrl
        } else {
          return ''
        }
      },
      // 获取作者和歌曲的展示信息
      getArtists() {
        if(this.getShowSong[0].artists) {
          return this.getShowSong[0].artists[0].name
        } else if(this.getShowSong[0].ar) {
          return this.getShowSong[0].ar[0].name
        }
      },
      // 获取本歌曲的时长
      getMusicTime() {
        if(this.getShowSong[0].bMusic) {
          return this.getShowSong[0].bMusic.playTime
        } else if(this.getShowSong[0].dt) {
          return this.getShowSong[0].dt
        }
      }
    },
    filters: {
      // 转换成 00:00格式的时间过滤器
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
      // NavBar的返回按钮
      confirmBack() {
        this.$store.commit('showMusicPlayer', false)
      },
      // 显示歌词
      showLyric() {
        this.$refs.show.style.visibility = 'hidden'
        this.isShowLyric = true
      },
      // 切换播放的模式
      changeMove() {
        this.move ++
        this.move = this.move > 3? 1 : this.move
        this.$store.commit('setSongFlag',{move: this.move})
      },
      // 点击播放和暂停按钮
      startOrstopSong() {
        // 使用事件总线来控制player组件的播放和暂停
        this.$bus.$emit('startOrstopSong')
        this.start = !this.start
        this.$store.commit('setSongFlag',{btnFlag: this.start})
      },
      // 实时获取当前播放的时间
      onTimeUpdate() {
        // 通过事件总线，获取歌曲当前播放的时间点
        this.$bus.$on('timeUpdate', (time) => {
          this.time = parseInt(time)
        })
      },
      // 获取进度条的总长度
      getTotalLength(allWidth) {
        this.allWidth = allWidth
      },
      // 点击进度条改变时间，注意：audio的currentIndex是可读可写的
      changeTime(currentW) {
        this.changeLyric = true
        var time = currentW * (this.getMusicTime / 1000) / this.allWidth
        this.$bus.$emit('changeTime',time)
      },
      // 拖动进度条操作
      touchTime(length) {
        // 当用户拖动的时候，设置状态为false，这里设置状态的原因是为了当拖拽事件结束之后，可以监听状态的改变从而重新通过事件总线发起监听
        this.flag = false
        this.time = length * (this.getMusicTime / 1000) / this.allWidth
        // 在拖动的过程中要先关闭该事件总线，不然会存在一来一回的情况
        this.$bus.$off('timeUpdate')
      },
      // 拖动结束之后
      endTime() {
        // 在拖动结束之后，发起改变时间的事件，同时将状态改回true
        this.$bus.$emit('changeTime',this.time)
        this.flag = true
        this.changeLyric = true
      },
      // 播放上一首
      beforeClick() {
        // 先获取当前播放音乐在歌曲列表中的索引位置
        var index = this.getPlayingSong.findIndex(item => item.id == this.getSongObj.id)
        // 通过事件总线，调用播放器的播放下一首函数
        this.$bus.$emit('beforeSong')
      },
      // 播放下一首
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
        this.bgUrl = this.getImgUrl
        this.sheet.insertRule(`.musicPlayer::before { background: url(${this.bgUrl}) -136px 0px/ 100vh }`, 0)
      },
      removeStyleBg() {
        document.head.removeChild(this.style)
        this.style = this.sheet = null
      },
      // 页面加载完成的时候获取当前播放的相关信息
      setInitSongFlag() {
        this.move = this.getSongFlag.move
        this.start = this.getSongFlag.btnFlag
        this.currentLength = this.getSongFlag.currentLength
        this.time = this.getSongFlag.currentTime
      },
      // 获取歌词信息
      getSongLyric() {
        getLyric(this.getSongObj.id).then(res => {
          if(res.code == 200) {
            this.lyric = res.lrc
          }
        })
      },
      // 打开歌曲评论页面
      openComment() {
        this.showComment = true
      }
    },
    mounted() {
      this.setStyleBg()
      this.onTimeUpdate()
      this.setInitSongFlag()
      this.getSongLyric()
    },
    beforeDestroy() {
      document.head.removeChild(this.style)
      this.style = null
      this.$store.commit('setSongFlag',{currentLength: this.currentLength})
      this.$store.commit('setSongFlag',{currentTime: this.time})
    },
    watch: {
      /**
       * 监听音乐切换的时候将偏移量和索引归0，从歌曲列表进来的时候是监听不到的因为我是通过v-if显示的，所以点击歌曲列表进来的时候，监听器还没生成，
       * 这里的监听是监听歌曲播放完之后自动切换到下一首的时候会触发，前提是没有关闭播放器页面
       */
      getSongObj() {
        this.removeStyleBg()
        this.setStyleBg()
        this.getSongLyric()
        this.start = true
        this.$store.commit('setSongFlag',{btnFlag: this.start})
      },
      // 监听时间变化，时间一边就计算进度条当前位置的长度
      time(val,oldVal) {
        this.currentLength = val * this.allWidth / (this.getMusicTime / 1000)
        if(val == parseInt(this.getMusicTime / 1000)) {
          // 控制播放按钮和暂停按钮的显示
          this.start = false
          this.$store.commit('setSongFlag',{btnFlag: this.start})
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
    z-index 10000
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
  .show {
    position absolute
    z-index 1
  }
  .albumImg {
    width 275px
    height 275px
    border-radius 50%
    background-color rgba(144,144,144,.5)
    margin 70px auto 70px
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
  .normal {
    width 100vw
    height: calc(100vh - 50px - 130px);
    /* box-sizing border-box
    padding-top 70px */
    overflow hidden
    position relative
  }
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translate(0,60px);
  }
  .list-enter-active, .list-leave-active {
    transition: all .2s;
  }
</style>