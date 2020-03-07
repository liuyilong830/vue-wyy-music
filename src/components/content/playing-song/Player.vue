<template>
  <div class="player">
    <playing-song class="playing-song" v-if="getPlayingSong.length !== 0" @click="openPlayer">
      <template v-slot:Album>
        <img :src="getPlayingSong[index].album.blurPicUrl" alt="">
      </template>
      <template v-slot:songName>
        {{getPlayingSong[index].name}}
      </template>
      <template v-slot:changeIcon>
        <span class="iconfont icon-bofang2" v-if='!palyFlag' @click="playClick"></span>
        <span class="iconfont icon-bofangzhong" v-else @click="playClick"></span>
      </template>
    </playing-song>

    <audio :src="getSongObj.url" ref="audio" @ended="onended"></audio>
  </div>
</template>

<script>
  import PlayingSong from './PlayingSong'
  import {mapGetters} from 'vuex'
  export default {
    name: 'Player',
    components: {
      PlayingSong
    },
    data() {
      return {
        palyFlag: false,
        index: 0
      }
    },
    computed: {
      ...mapGetters(['getPlayingSong','getSongObj','getSongsDetail'])
    },
    watch: {
      // 监听到 getSongDetail对象中发生变化的时候，播放对应的音乐
      getSongObj() {
        // 这里不能直接调用play方法，因为此时audio还在加载元数据，如果在加载过程中调用，会中断加载，所以我采用了等他元数据加载完后触发的事件
        this.$refs.audio.addEventListener('loadedmetadata', () => {
          this.$refs.audio.play()
          this.palyFlag = true
        })
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
      },
      // 当播放结束的时候进行的操作
      onended() {
        if(this.getPlayingSong[this.index+1]) {
          this.index ++
          this.$store.commit('changeSongObj',this.getSongsDetail[this.index])
        }else {
          return this.palyFlag = false
        }
      },
      openPlayer() {
        console.log(111)
        this.$router.replace('/music')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .playing-song .icon-bofangzhong {
    font-size  28px
  }
</style>