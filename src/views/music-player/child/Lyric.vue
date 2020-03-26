<template>
  <div class="main" :style="{visibility: getShowLyric}">
    <volume-progress-bar></volume-progress-bar>
    <div class="contain">
      <ul 
      class="lyric" 
      ref="itemList" 
      @touchstart.stop='touchStart' 
      @touchmove.stop='touchMove' 
      @touchend.stop='touchEnd'
      @click="closeLyric">
        <li v-if="noLyric" class="item active">纯音乐，无歌词</li>
        <li v-for="(item,index) in getRealLyric" :key="index" class="item" :class="{active: currentIndex == index}">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import VolumeProgressBar from './VolumeProgressBar'
  import {mapGetters} from 'vuex'
  export default {
    name: 'Lyric',
    components: {
      VolumeProgressBar
    },
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
        flag: false,
        touchY: 0,
        marginBottom: 0,
        init: true
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
      },
      changeLyric: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      noLyric() {
        if(this.lyric.lyric == '') {
          return true
        }
      },
      // 将获取到的歌词才分成时间组成的数组和歌词组成的数组，两者一一对应
      getRealLyric() {
        if(Object.keys(this.lyric).length !== 0) {
          if(this.lyric.lyric == '') {
            return ''
          }
          this.timeArr = this.lyric.lyric.match(/(\[\d+.*\])/g)
          this.timeArr = this.timeArr.map(item => item.substring(1,item.length-1))
          this.textArr = this.lyric.lyric.split(/\[\d*:\d*.\d*\]/)
          this.textArr.shift()
          return this.textArr
        }
        return ''
      },
      // 这里的getSongObj是将来监听歌曲切换之后，要改变歌词和背景等数据的
      ...mapGetters(['getSongObj']),
      // 这里之所以用 visibility 而不用 display是因为会出一点小问题，忘了是啥问题了
      getShowLyric() {
        return this.$attrs.isShowLyric? 'visible' : 'hidden'
      }
    },
    // 这里的model是用来实现 父组件上使用的 v-model
    model: {
      prop: 'isShowLyric',
      event: 'click'
    },
    methods: {
      // 实现旋转cd和歌词页面的动态切换显示
      closeLyric() {
        this.$emit('click', !this.$attrs.isShowLyric)
      },
      // 用户手动滑动歌词的ul
      touchStart(event) {
        if(this.lyric.lyric == '') return;
        this.$refs.itemList.style.transition = `0s`
        // 滑动开始的时候就需要停止歌词的滚动，也就是让 this.offsetY只变动值，但是不赋值给translate属性，设置为true则停止滚动
        this.flag = true
        // 先获取最开始的时候ul的距离顶部的高度
        this.getY = Number(/\d+/.exec(this.$refs.itemList.style.transform)[0])
        // 获取滑动开始的时候距离顶部的高度
        this.startY = event.touches[0].pageY || event.touches[0].clientY
      },
      // 通过滑动开始距离顶部的高度 - 滑动过程中记录的距离顶部的高度，就是手指滑动的偏移量，但是实际上ul的高度应该是初始的距离顶部高度+偏移量
      touchMove(event) {
        this.touchY = this.getY + (this.startY - event.touches[0].pageY)
        this.$refs.itemList.style.transform = `translateY(-${this.touchY}px)`
      },
      // 滑动结束之后，过1.5s之后再改变状态，让他混动到他指定的位置
      touchEnd() {
        setTimeout(() => {
          this.flag = false
        }, 1500)
      },
      // 这里通过事件总线获取不断变化的时间，后面就可以通过监听器监听时间的变化了
      timeUpdate() {
        this.$bus.$on('timeUpdate', time => {
          this.time = time
        })
      },
      // 当点击进度条的时候，获取当前进度条时间所对应的最近的 currentIndex，因为要跳到对应的currentIndex，所有我们就获取绝对值最小的
      setJumpIndex(time) {
        let num = 0
        var index = 0
        let arr = this.timeArr.map(item => {
          item = item.split(':')
          num = item[0]*60 + Number(item[1])
          return Math.abs(num-time)
        })
        index = Math.min(...arr)
        index = arr.findIndex(item => {
          return item == index
        })
        return index
      },
      // 上面获取到最近的 currentIndex 之后呢，就可以通过从数组第一项到 currentIndex 前面那一项的总高度，这样就能达到点击进度条也能跳转到准确位置了
      setTranslateY(index) {
        var offset = 0
        for(var i = 0; i < this.currentIndex; i++) {
          offset += this.$refs.itemList.children[i].getBoundingClientRect().height + 15
        }
        this.offsetY = offset
        this.$refs.itemList.style.transform = `translateY(-${this.offsetY}px)`
        this.$refs.itemList.style.transform = `.2s`
      },
      // 动态获取css中设置的margin-bottom：15px，因为最后项目做完之后是要使用插件转换成vw的，所以只能动态获取
      getMarginBottom() {
        var margin = ''
        margin = window.getComputedStyle(this.$refs.itemList.children[1]).marginBottom
        this.marginBottom = Number(margin.substring(0,margin.length - 2))
      }
    },
    mounted() {
      this.timeUpdate()
    },
    watch: {
      // 监听时间的变化，是有小数的时间
      time(val,oldVal) {
        if(this.lyric.lyric == '') return;
        // 该属性是父组件传递下来的，是在用户点击或拖动进度条的时候才触发
        if(this.changeLyric || this.init) {
          this.currentIndex = this.setJumpIndex(val)
          this.setTranslateY(this.currentIndex)
          this.$emit('update:changeLyric', !this.changeLyric)
          this.init = false
        }
        // 当歌词跳转到最后一句的时候，索引已经是数组里面最大的了，但是因为下面要通过比较他后面一句的所有的时间，那么将会报错，所以要直接return
        if(this.currentIndex >= this.timeArr.length-1) return
        /**
         * 这里将一下为什么需要和下一句的歌词对比
         *        [00:01.123] 你好   (currentIndex: 0)
         *        [00:03.34]  我是xxxx   (currentIndex: 1)
         *        [00:05.993] 听说很高兴我能够遇见你   (currentIndex: 2)
         * 假设歌词是这样的，我们希望达到的肯定是在 我是xxx 开始播放的时候才移动translate属性，所以我们需要将 time的最新值和 currentIndex+1的时间去比
         */
        var arr = this.timeArr[this.currentIndex+1].split(':')
        // 当 time的新值大于等于 第二句的开始的时间，就进行移动
        if(val >= arr[0]*60 + Number(arr[1])) {
          this.offsetY += this.$refs.itemList.children[this.currentIndex].getBoundingClientRect().height + this.marginBottom
          // 这里的目的就是上面说的如果发生了手动移动ul的情况，就需要只计算 offsetY的值，但是不进行偏移，如果没有则进行偏移
          if(!this.flag) {
            this.$refs.itemList.style.transform = `translateY(-${this.offsetY}px)`
            this.$refs.itemList.style.transition = `.2s`
          }
          // 不管是否偏移，都需要加一，因为不偏移不代表不要计算高度，这是为了之后手指主动偏移玩之后还要回到指定位置
          this.currentIndex++
        }
      },
      // 这里是父组件传递下来的，是因为手指主动滑动的时候需要使用 this.$bus.$off取消掉当前时间的变更，所以完成拖动之后，需要在重新获取时间
      flag1(val,oldVal) {
        if(val == true) {
          this.timeUpdate()
        }
      },
      /**
       * 监听音乐切换的时候将偏移量和索引归0，从歌曲列表进来的时候是监听不到的因为我是通过v-if显示的，所以点击歌曲列表进来的时候，监听器还没生成，
       * 这里的监听是监听歌曲播放完之后自动切换到下一首的时候会触发，前提是没有关闭播放器页面
       */
      getSongObj(val,oldVal) {
        this.currentIndex = 0
        this.offsetY = 0
        this.$refs.itemList.style.transform = `translate(0,-${this.offsetY}px)`
        this.$refs.itemList.style.transform = `0s`
      },
      // 每次进入页面的时候，都需要重新获取mragin-bottom 的值，但是不能在mounted中获取，因为此时li还没生成，必须等到li都遍历之后再获取
      getRealLyric() {
        this.$nextTick(() => {
          this.getMarginBottom()
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .main {
    width 100vw
    height 100%
    box-sizing border-box
    padding 0 40px
  }
  .contain {
    height calc(100% - 20px)
    overflow hidden
  }
  .lyric {
    /* width 100vw
    box-sizing border-box
    padding 50% 40px
    position absolute
    z-index 1
    top 0 */
    padding 233.5px 0
  }
  .item {
    width 100%
    margin-bottom 15px
    word-break break-all
    color rgba(255,255,255, .7)
    font-size 15px
    text-align center
    letter-spacing 1px
    min-height 20px
  }
  .active {
    color #ffffff
  }
</style>