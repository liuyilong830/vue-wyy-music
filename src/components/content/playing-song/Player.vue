<template>
  <div class="player" @click.capture="captureClick">
    <playing-song class="playing-song" v-if="getShowSong.length !== 0">
      <template v-slot:Album>
        <img :src="getImgUrl" @click="openPlayer" alt="">
      </template>
      <template v-slot:songName>
        {{getShowSong[0].name}}
      </template>
      <template v-slot:changeIcon>
        <span class="iconfont icon-bofang2" v-if='!getSongFlag.btnFlag' @click="playClick"></span>
        <span class="iconfont icon-bofangzhong" v-else @click="playClick"></span>
      </template>
    </playing-song>

    <audio :src="getSongObj.url" ref="audio" @ended="onended" @timeupdate="onTimeUpdate"></audio>
  </div>
</template>

<script>
  import PlayingSong from './PlayingSong'
  import {mapGetters} from 'vuex'
  import {Toast} from 'vant'
  export default {
    name: 'Player',
    components: {
      PlayingSong
    },
    data() {
      return {
        index: 0,
        songList: [],
        randomSongList: [],
        volume: 1,
        flag: true
      }
    },
    computed: {
      ...mapGetters(['getPlayingSong','getSongObj','getSongsDetail','getSongFlag','getShowSong','getCurrentIndex']),
      // 获取背景图片
      getImgUrl() {
        if(this.getShowSong[0].album) {
          return this.getShowSong[0].album.blurPicUrl
        } else if(this.getShowSong[0].al) {
          return this.getShowSong[0].al.picUrl
        } else {
          return ''
        }
      }
    },
    watch: {
      // 监听到 getSongDetail对象中发生变化的时候，播放对应的音乐
      getSongObj(val) {
        if(!val.url) {
          return this.next()
        }
        // 这里不能直接调用play方法，因为此时audio还在加载元数据，如果在加载过程中调用，会中断加载，所以我采用了等他元数据加载完后触发的事件
        this.$refs.audio.addEventListener('loadedmetadata', () => {
          this.index = this.getCurrentIndex
          this.$refs.audio.play()
        })
      },
      // 生成随机播放的歌曲数组
      getSongsDetail(val,oldVal) {
        this.songList = val.map(item => item)
        this.setRandomList(this.songList.length)
      },
      volume(val,oldVal) {
        this.$refs.audio.volume = val
      }
    },
    methods: {
      captureClick() {
      
      },
      // 暂停音乐
      stopMusic() {
        if(!this.$refs.audio.paused) {
          this.$refs.audio.pause()
          this.flag = false
          this.$store.commit('setSongFlag',{btnFlag: this.flag})
        }
      },
      // 播放和暂停操作的切换
      playClick() {
        // 当播放的时候，paused的值为false
        if(this.$refs.audio.paused) {
          this.$refs.audio.play()
          this.flag = true
        } else {
          this.$refs.audio.pause()
          this.flag = false
        }
        this.$store.commit('setSongFlag',{btnFlag: this.flag})
      },
      getTime() {
        // audio可以获取当前歌曲播放的时间
        this.$bus.$emit('timeUpdate',this.$refs.audio.currentTime)
      },
      // 播放下一首
      next() {
        // move=1位列表循环播放，2为单曲循环，3为随机播放
        if(this.getSongFlag.move === 1) {
          this.listLoop(true)
        } else if(this.getSongFlag.move === 2) {
          this.onlyOneLoop()
        } else {
          this.randomLoop(true)
        }
      },
      // 播放上一首
      before() {
        if(this.getSongFlag.move === 1) {
          this.listLoop(false)
        } else if(this.getSongFlag.move === 2) {
          this.onlyOneLoop()
        } else {
          this.randomLoop(false)
        }
      },
      // 列表循环播放
      listLoop(flag) {
        flag == true ? this.index ++ : this.index --
        if(this.getPlayingSong[this.index]) {
          this.$store.commit('changeSongObj',this.getSongsDetail[this.index])
        }else {
          flag == true ? this.index = 0 : this.index = this.getSongsDetail.length - 1
          this.$store.commit('changeSongObj',this.getSongsDetail[this.index])
        }
      },
      // 单曲循环播放
      onlyOneLoop() {
        if(this.$refs.audio.paused) {
          this.$refs.audio.play()
        }
      },
      // 随机列表循环播放
      randomLoop(flag) {
        flag == true ? this.index ++ : this.index --
        if(this.randomSongList[this.index]) {
          this.index ++
          this.$store.commit('changeSongObj',this.randomSongList[this.index])
        } else {
          flag == true ? this.index = 0 : this.index = this.randomSongList.length - 1
          this.$store.commit('changeSongObj',this.randomSongList[this.index])
        }
      },
      // 将列表循环的数组变成随机的数组，然后按随机数组播放就是随机播放功能了(这里的数组是复制的一个新数组，并没有改变之前的数组)
      setRandomList(length) {
        this.randomSongList.splice(0)
        var obj = {}
        var len = length
        this.randomSongList.push(this.getSongObj)
        for(var i = 0; i < len; i++) {
          var num = Math.floor(Math.random()*this.songList.length)
          obj = this.songList.splice(num,1)[0]
          if(this.getSongObj.id !== obj.id) {
            this.randomSongList.push(obj)
          }
        }
      },
      // 当播放结束的时候进行的操作
      onended() {
        this.next()
        this.$bus.$emit('endedSong')
      },
      // 监听audio的时间更新的事件
      onTimeUpdate() {
        this.getTime()
      },
      // 点击图片打开播放器
      openPlayer() {
        // this.$router.push('/music')
        this.$store.commit('showMusicPlayer', true)
      }
    },
    mounted() {
      // 当 MusicPlayer 组件点击了播放和暂停按钮触发
      this.$bus.$on('startOrstopSong', () => {
        this.playClick()
        this.getTime()
      })
      // 当 MusicPlayer 组件移动了进度条的时候触发
      this.$bus.$on('changeTime', time => {
        this.$refs.audio.currentTime = time
      })
      // 当 MusicPlayer 组件点击了播放下一首的按钮
      this.$bus.$on('nextSong', () => {
        this.next()
      })
      // 当 MusicPlayer 组件点击了播放上一首的按钮
      this.$bus.$on('beforeSong', () => {
        this.before()
      })
      // 调增音量
      this.$bus.$on('changeVolume', Proportion => {
        this.volume = Proportion
      })
      // 当跳转到登录页面的时候，如果歌曲正在播放，则需要关闭音乐
      this.$bus.$on('stopMusic', () => {
        this.stopMusic()
      })
    }
  }
</script>

<style lang="stylus" scoped>
  .player {
    width 100vw
    height 45px
    position fixed
    bottom 0
    z-index 99
  }
  .playing-song .icon-bofangzhong {
    font-size  28px
  }
</style>