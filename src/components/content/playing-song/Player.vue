<template>
  <div class="player">
    <playing-song class="playing-song" v-if="getShowSong.length !== 0">
      <template v-slot:Album>
        <img :src="getShowSong[0].album.blurPicUrl" @click="openPlayer" alt="">
      </template>
      <template v-slot:songName>
        {{getShowSong[0].name}}
      </template>
      <template v-slot:changeIcon>
        <span class="iconfont icon-bofang2" v-if='!palyFlag' @click="playClick"></span>
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
        palyFlag: false,
        index: 0,
        songList: [],
        randomSongList: []
      }
    },
    computed: {
      ...mapGetters(['getPlayingSong','getSongObj','getSongsDetail','getSongFlag','getShowSong','getCurrentIndex'])
    },
    watch: {
      // 监听到 getSongDetail对象中发生变化的时候，播放对应的音乐
      getSongObj() {
        // 这里不能直接调用play方法，因为此时audio还在加载元数据，如果在加载过程中调用，会中断加载，所以我采用了等他元数据加载完后触发的事件
        this.$refs.audio.addEventListener('loadedmetadata', () => {
          this.index = this.getCurrentIndex
          this.$refs.audio.play()
          this.palyFlag = true
        })
      },
      getSongsDetail(val,oldVal) {
        this.songList = val.map(item => item)
        this.setRandomList(this.songList.length)
      }
    },
    methods: {
      // 播放和暂停操作
      playClick() {
        // 当播放的时候，paused的值为false
        if(this.$refs.audio.paused) {
          this.$refs.audio.play()
          this.palyFlag = true
        } else {
          this.$refs.audio.pause()
          this.palyFlag = false
        }
        this.$store.commit('setSongFlag',{btnFlag: this.palyFlag})
      },
      getTime() {
        // console.log(this.$refs.audio.currentTime)
        this.$bus.$emit('timeUpdate',this.$refs.audio.currentTime)
      },
      // 播放下一首的函数
      next() {
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
        if(this.getMove === 1) {
          this.listLoop(false)
        } else if(this.getMove === 2) {
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
          this.palyFlag = true
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
      },
      onTimeUpdate() {
        this.getTime()
      },
      openPlayer() {
        this.$router.push('/dailyRem/music')
      }
    },
    mounted() {
      this.$bus.$on('startOrstopSong', () => {
        this.playClick()
        this.getTime()
      })
      this.$bus.$on('changeTime', time => {
        this.$refs.audio.currentTime = time
      })
      this.$bus.$on('nextSong', () => {
        this.next()
      })
      this.$bus.$on('beforeSong', () => {
        this.before()
      })
    }
  }
</script>

<style lang="stylus" scoped>
  .player {
    width 100vw
    height 45px
  }
  .playing-song .icon-bofangzhong {
    font-size  28px
  }
</style>