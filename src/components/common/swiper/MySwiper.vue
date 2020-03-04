<template>
  <div class="my-swiper">
    <div class="my-swiper-item-wrap" ref="swiper_wrap" @touchstart='touchStart' @touchmove='touchMove' @touchend='touchEnd'>
      <slot></slot>
    </div>
    <slot name="indicator">
      <div class="my-indicators">
        <i class="indicator-item" 
          :class="{'indicator-item-active': i == index}" 
          :style="{backgroundColor: i == index? indicatorColor : '#ebedf0'}" 
          v-for="i in count" :key="i">
        </i>
      </div>
    </slot>
  </div>
</template>

<script>
  export default {
    name: 'MySwiper',
    props: {
      duration: { // 动画时间
        type: Number,
        default: 500
      },
      autoplay: { // 延迟时间
        type: Number,
        default: 3000
      },
      offset: { // 偏移量：拖动距离超过多少的时候就显示下一张
        type: Number,
        default: 0
      },
      indicatorColor: { // 指示器的颜色
        type: String,
        default: '#1989fa'
      },
      initIndex: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {
        count: 0,  // 记录图片的数量
        viewportWidth: 0, // 计算视口的宽度
        timer: null,  // 定时滚动到下一张
        timer2: null, // 到达边界值的时候需要通过一次性定时器让其跳转到真正的位置
        move: 0,  // 移动的距离
        index: 1,  // 记录当前的图片索引
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
        offsetX: 0,
        offsetY: 0,
        cloneMove: 0,
        showWidth: 0
      }
    },
    computed: {
      positionX() {
        return this.offsetX = this.endX - this.startX
      },
      positionY() {
        return this.offsetY = this.endY - this.startY
      },
      getCount() {
        var childArr = [...this.$refs.swiper_wrap.children].filter(item => item.className == 'swiper-list')
        return this.count = childArr.length
      }
    },
    methods: {
      // 克隆第一个和最后一个节点
      cloneElement() {
        this.getCount
        this.viewportWidth = document.documentElement.clientWidth
        if(this.count > 1) {
          let firstNode = this.$refs.swiper_wrap.children[0].cloneNode(true)
          let lastNode = this.$refs.swiper_wrap.children[this.count-1].cloneNode(true)
          this.$refs.swiper_wrap.insertBefore(lastNode, this.$refs.swiper_wrap.children[0]);
          this.$refs.swiper_wrap.appendChild(firstNode)
          this.$refs.swiper_wrap.style.width = ((this.count+2) * this.viewportWidth) + 'px'
        }
      },
      // 设置偏移量
      setTranslateX(positionX) {
        this.$refs.swiper_wrap.style.transform = `translateX(-${positionX}px)`
      },
      // 移动触发
      moveElement() {
        this.timer = setInterval(() => {
          // 如果到达了克隆加上去的最后一个也就是复制的firstNode，就需要立即跳转到真正的第一个
          this.nextElement()
          this.changeShowElement()
        }, this.autoplay)
      },
      // 每隔一定的时间，移动一个视口宽度的位置
      nextElement() {
        this.$refs.swiper_wrap.style.transitionDuration = this.duration + 'ms'
        this.index ++
        this.move = this.viewportWidth * this.index
        this.setTranslateX(this.move)
      },
      // 当到达边界节点的时候，需要跳转位置
      changeShowElement() {
        if(this.index >= this.count + 1) {
          this.index = 1
          // 这里的一句话是为了拖动的时候使用的
          this.move = this.move == ((this.count + 1)*this.viewportWidth)? this.index*this.viewportWidth : this.move
        } else if (this.index <= 0) {
          this.index = this.count
          // 这里的一句话是为了拖动的时候使用的
          this.move = this.move == 0? this.index*this.viewportWidth : this.move
        }
        this.$emit('change',this.index-1)
        this.timer2 = setTimeout(() => {
          this.$refs.swiper_wrap.style.transitionDuration = '0ms'
          this.setTranslateX(this.index*this.viewportWidth)
        },this.duration - 50)
      },
      // 清除定时器
      clearTimer() {
        clearInterval(this.timer)
      },
      // 手指触碰到屏幕时触发
      touchStart(event) {
        this.startX = event.touches[0].clientX || event.touches[0].pageX
        this.startY = event.touches[0].clientY || event.touches[0].pageY
      },
      // 手指移动时触发
      touchMove(event) {
        // 这里的过渡时间必须加上，不然从第二次拖动开始，会感觉到拖动很吃力
        this.$refs.swiper_wrap.style.transitionDuration = '0ms'
        // 移动的时候需要停止定时器
        this.clearTimer(this.timer)
        // 计算手松开的位置
        this.endX = event.touches[0].clientX || event.touches[0].pageX
        this.endY = event.touches[0].clientY || event.touches[0].pageY
        // 计算偏移量
        this.positionX
        this.positionY
        // 根据偏移量去移动 this.$refs.swiper_wrap 的 transform:translateX()
        // 如果offsetX > 0,说明是要往右移动，那么move应该越来越小
        this.setTranslateX(this.move - this.offsetX)
        this.cloneMove = this.move - this.offsetX
      },
      // 手机离开屏幕时触发
      touchEnd(event) {
        this.$refs.swiper_wrap.style.transitionDuration = this.duration + 'ms'
        // 当手松开的时候判断当前的绝对值的offsetX的位置有没有超过屏幕的一半宽度，如果超过了，则需要切换到需要显示的那一张，否则显示之前的那张
        if(Math.abs(this.offsetX) >= this.offset) {
          // 如果offsetX>0，说明是在往右滑动
          if(this.offsetX >= 0) {
            this.move = this.cloneMove - (this.viewportWidth - this.offsetX)
            this.index --
          // 往左滑动
          } else if(this.offsetX < 0) {
            this.move = this.cloneMove + (this.viewportWidth + this.offsetX)
            this.index ++
          }
          this.setTranslateX(this.move)
          // 滑动过后，必须先检查有没有到边界值，如果到了在边界值中可以调整位置
          this.changeShowElement()
        } else {
          this.setTranslateX(this.move)
        }
        this.moveElement()
      }
    },
    mounted() {
      this.index = this.initIndex
      this.cloneElement()
      this.move = this.index*this.viewportWidth
      this.setTranslateX(this.index*this.viewportWidth)
      // 开始移动 swiper_wrap
      this.moveElement()
      document.addEventListener('visibilitychange', () => {
        if(document.hidden) {
          this.clearTimer()
        } else {
          this.moveElement()
        }
      })
    },
    beforeDestroy() {
      this.clearTimer()
    },
    deactivated() {
      this.clearTimer()
    },
    activated() {
      this.moveElement()
    }
  }
</script>

<style scoped>
  .my-swiper {
    width: 100vw;
    overflow: hidden;
    position: relative;
  }
  .my-swiper-item-wrap {
    font-size: 0;
  }
  .my-indicators {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
  }
  .indicator-item {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #ebedf0;
    margin-right: 6px;
    opacity: .5;
    transition: opacity .3s;
  }
  .indicator-item-active {
    background-color: #1989fa;
    opacity: 1;
  }
</style>