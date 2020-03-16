<template>
  <div class="swiper-3d" @touchstart="ontouchstart" @touchmove="ontouchmove" @touchend="ontouchend" ref="swiper_3d">
    <div class="left-img" ref="left" style="transform:translate3d(0,-50%,-10px); left: 7.46666%;"></div>
    <div class="center-img" ref="center" style="transform:translate3d(-50%,-50%,45px); left: 50%;"></div>
    <div class="right-img" ref="right" style="transform:translate3d(0,-50%,-10px); left: 58.4%;"></div>
  </div>
</template>

<script>
  export default {
    name: 'Swiper3D',
    components: {},
    data() {
      return {
        startX: 0,
        endX: 0,
        offsetX: 0,
        transArr: [],
        transArr2: [],
        left: [],
        currentIndexObj: {
          left: 0,
          center: 1,
          right: 2
        },
        transX: 0,
        leftL: 0,
        centerL: 0,
        rightL: 0,
        swiperWidth: 0
      }
    },
    props: {
      touchX: { // 当手指滑动距离超过 40px 之后就会发生移动，否则返回到上一次的位置
        type: Number,
        default: 40
      }
    },
    methods: {
      // 手机触碰屏幕开始
      ontouchstart(event) {
        this.startX = event.touches[0].pageX || event.touches[0].clientX
      },
      // 移动过程中
      ontouchmove(event) {
        this.endX = event.touches[0].pageX || event.touches[0].clientX
        // 如果是向左滑动，则 offsetX 的值为正数，且越来越大；反之 offsetX 的值为负数，且越来越小
        this.offsetX = this.startX - this.endX
        
      },
      // 移动结束之后触发
      ontouchend() {
        if(this.offsetX > 0) {
          for(let key in this.currentIndexObj) {
            this.currentIndexObj[key] == 0? this.currentIndexObj[key] = 2 : this.currentIndexObj[key] --
          }
        } else {
          for(let key in this.currentIndexObj) {
            this.currentIndexObj[key] == 2? this.currentIndexObj[key] = 0 : this.currentIndexObj[key] ++
          }
        }
        this.changeSpace('left' , this.transArr[this.currentIndexObj.left] , this.left[this.currentIndexObj.left] , this.currentIndexObj.left)
        this.changeSpace('center' , this.transArr[this.currentIndexObj.center] , this.left[this.currentIndexObj.center] , this.currentIndexObj.center)
        this.changeSpace('right' , this.transArr[this.currentIndexObj.right] , this.left[this.currentIndexObj.right] , this.currentIndexObj.right)
        this.$refs.left.style.transition = this.$refs.center.style.transition = this.$refs.right.style.transition = '.5s'
      },
      // 改变对应图片的位置和大小
      changeSpace(name,offset,left,index = 0 ) {
        this.$refs[name].style.transform = `translate3d(${offset})`
        this.$refs[name].style.left = `${left}`
        if(index === 1) {
          this.$refs[name].style.zIndex = `2`
        } else {
          this.$refs[name].style.zIndex = `1`
        }
      },
      // 获取三张图片的 translate3d 值保存在 transArr 数组中，left 值保存在 left 对象中
      getSpace() {
        let left = this.$refs.left.style.transform.match(/\(.*\)$/g)[0].substring(1,this.$refs.left.style.transform.match(/\(.*\)$/g)[0].length-1)
        let center = this.$refs.center.style.transform.match(/\(.*\)$/g)[0].substring(1,this.$refs.center.style.transform.match(/\(.*\)$/g)[0].length-1)
        let right = this.$refs.right.style.transform.match(/\(.*\)$/g)[0].substring(1,this.$refs.right.style.transform.match(/\(.*\)$/g)[0].length-1)
        this.transArr.push(left,center,right)
        this.transArr2.push(left.split(','), center.split(','), right.split(','))
        this.left.push(this.$refs.left.style.left,this.$refs.center.style.left,this.$refs.right.style.left)
        this.changeToNum()
      },
      // 将数组中的数转换为对应的数字
      changeToNum() {
        for(let i = 0; i < this.transArr2.length; i++) {
          for(let j = 0; j < this.transArr2[i].length; j++) {
            if(this.transArr2[i][j].includes('%') && j == 1) {
              var height = Number(window.getComputedStyle(this.$refs.left).height.substring(0,window.getComputedStyle(this.$refs.left).height.length-2))
              this.transArr2[i][j] = height * Number(this.transArr2[i][j].substring(0,this.transArr2[i][j].length-1)) / 100
              continue
            }
            if(this.transArr2[i][j].includes('%') && j == 0) {
              var width = Number(window.getComputedStyle(this.$refs.left).width.substring(0,window.getComputedStyle(this.$refs.left).width.length-2))
              this.transArr2[i][j] = width * Number(this.transArr2[i][j].substring(0,this.transArr2[i][j].length-1)) / 100
              continue
            }
            this.transArr2[i][j] = Number(this.transArr2[i][j].substring(0,this.transArr2[i][j].length-2))
          }
        }
      }
    },
    mounted() {
      this.getSpace()
      this.swiperWidth = this.$refs.swiper_3d.getBoundingClientRect().width
      this.transX = - Number(window.getComputedStyle(this.$refs.center).width.substring(0,window.getComputedStyle(this.$refs.center).width.length-2)) * .5
      this.leftL = Number(window.getComputedStyle(this.$refs.left).left.substring(0,window.getComputedStyle(this.$refs.left).left.length-2))
      this.centerL = Number(window.getComputedStyle(this.$refs.center).left.substring(0,window.getComputedStyle(this.$refs.center).left.length-2))
      this.rightL = Number(window.getComputedStyle(this.$refs.right).left.substring(0,window.getComputedStyle(this.$refs.right).left.length-2))
    }
  }
</script>

<style lang="stylus" scoped>
  .swiper-3d {
    width: 100vw;
    height: 250px;
    box-sizing border-box
    padding 10px 15px
    position relative
    perspective 400
    .left-img, .center-img, .right-img {
      border-radius 6px
      position absolute
    }
    .left-img {
      width: 130px;
      height: 180px;
      top 50%
      /*left 28px
      transform translate3d(0,-50%,-10px)*/
      z-index 1
      background-color #2fc1f1
    }
    .center-img {
      width: 130px;
      height: 180px;
      z-index 2
      top 50%
      /*left 50%
      transform translate3d(-50%,-50%,45px)*/
      background-color pink
    }
    .right-img {
      width: 130px;
      height: 180px;
      z-index 1
      top 50%
      /*transform translate3d(0,-50%,-10px)
      left 219px*/
      background-color #3aff3a
    }
  }
</style>