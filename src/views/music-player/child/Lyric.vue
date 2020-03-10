<template>
  <ul 
  class="lyric" 
  ref="itemList" 
  @touchstart.stop='touchStart' 
  @touchmove.stop='touchMove' 
  @touchend.stop='touchEnd' 
  :style="{visibility: getShowLyric}"
  @click="closeLyric">
    <li v-for="(item,index) in getRealLyric" :key="index" class="item" :class="{active: currentIndex == index}">{{item}}</li>
  </ul>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'Lyric',
    data() {
      return {
        timeArr: [],
        textArr: [],
        currentIndex: 0,
        offsetY: 0,
        time: 0,
        getY: 0,
        startY: 0,
        endY: 0,
        flag: false
      }
    },
    props: {
      lyric: {
        type: Object,
        default() {
          return {}
        }
      },
      flag1: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      getRealLyric() {
        if(Object.keys(this.lyric).length !== 0) {
          this.timeArr = this.lyric.lyric.match(/(\[\d+.*\])/g)
          this.timeArr = this.timeArr.map(item => item.substring(1,item.length-1))
          this.textArr = this.lyric.lyric.split(/\[\d*:\d*.\d*\]/)
          this.textArr.shift()
          return this.textArr
        }
        return ''
      },
      ...mapGetters(['getSongObj','getOffsetY']),
      getShowLyric() {
        return this.$attrs.isShowLyric? 'visible' : 'hidden'
      }
    },
    model: {
      prop: 'isShowLyric',
      event: 'click'
    },
    methods: {
      closeLyric() {
        this.$emit('click', !this.$attrs.isShowLyric)
      },
      touchStart(event) {
        console.log(111)
        this.$refs.itemList.style.transition = `0s`
        this.flag = true
        this.getY = Number(/\d+/.exec(this.$refs.itemList.style.transform)[0])
        this.startY = event.touches[0].pageY || event.touches[0].clientY
      },
      touchMove(event) {
        this.$refs.itemList.style.transform = `translateY(-${this.getY + (this.startY - event.touches[0].pageY)}px)`
      },
      touchEnd() {
        setTimeout(() => {
          this.flag = false
        }, 1500)
      },
      timeUpdate() {
        this.$bus.$on('timeUpdate', time => {
          this.time = time
        })
      },
      lyricInit() {
        this.currentIndex = this.getOffsetY.index
        this.offsetY = this.getOffsetY.offsetY
      }
    },
    mounted() {
      this.lyricInit()
      this.timeUpdate()
      this.$bus.$on('endedSong', () => {
        this.currentIndex = 0
        this.offsetY = 0
      })
    },
    beforeDestroy() {
      this.$store.commit('setLyricInfo',{offsetY: this.offsetY, index: this.currentIndex})
    },
    watch: {
      time(val,oldVal) {
        if(this.currentIndex >= this.timeArr.length-1) return 
        var arr = this.timeArr[this.currentIndex+1].split(':')
        if(val >= arr[0]*60 + Number(arr[1])) {
          this.offsetY += this.$refs.itemList.children[this.currentIndex].getBoundingClientRect().height + 15
          if(!this.flag) {
            this.$refs.itemList.style.transform = `translateY(-${this.offsetY}px)`
            this.$refs.itemList.style.transition = `.2s`
            if(this.offsetY == 0) this.$refs.itemList.style.transition = `0s`
          }
          this.currentIndex++
        }
      },
      flag1(val,oldVal) {
        if(val == true) {
          this.timeUpdate()
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .lyric {
    width 100vw
    box-sizing border-box
    padding 50% 40px
    position absolute
    z-index 1
    top 0
  }
  .item {
    width 100%
    margin-bottom 15px
    word-break break-all
    color rgba(255,255,255, .7)
    font-size 15px
    text-align center
    letter-spacing 1px
  }
  .active {
    color #ffffff
  }
</style>