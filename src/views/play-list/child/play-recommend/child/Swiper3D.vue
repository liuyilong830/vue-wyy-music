<template>
  <div>
    <div class="swiper-3d" @touchstart="ontouchstart" @touchmove.stop="ontouchmove" @touchend="ontouchend" ref="swiper_3d">
      <div class="block" v-for="(item,index) in topThree" :key="index" @click="openToSongList(item)" >
        <div class="img">
          <img :src="item.coverImgUrl" alt="">
        </div>
        <div class="text">
          <span>{{item.name}}</span>
        </div>
      </div>
    </div>
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
        items: {},
        transArr: [],
        leftArr: [],
      }
    },
    props: {
      touchX: { // 当手指滑动距离超过 40px 之后就会发生移动，否则返回到上一次的位置
        type: Number,
        default: 40
      },
      topThree: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      // 手机触碰屏幕开始
      ontouchstart(event) {
        this.startX = this.endX = this.offsetX = 0
        this.startX = event.touches[0].pageX || event.touches[0].clientX
        for(let key in this.items) {
          this.items[key].node.style.opacity = 0.5
        }
      },
      // 移动过程中
      ontouchmove(event) {
        this.endX = event.touches[0].pageX || event.touches[0].clientX
        // 如果是向左滑动，则 offsetX 的值为正数，且越来越大；反之 offsetX 的值为负数，且越来越小
        this.offsetX = this.startX - this.endX
      },
      // 移动结束之后触发
      ontouchend(event) {
        if(this.offsetX > 0) {
          for(let key in this.items) {
            this.changeIndex(this.items[key],true)
          }
        } else if(this.offsetX < 0) {
          for(let key in this.items) {
            this.changeIndex(this.items[key],false)
          }
        }
        for(let key in this.items) {
          let item = this.items[key]
          this.translate(item.node,this.transArr[item.index],this.leftArr[item.index],item)
          if(item.index === 0) {
            this.$emit('changeimg',item)
          }
        }
      },
      // 修改每个元素的 z-index 、translate3d 、left 、opacity
      translate(node,arr,left,obj) {
        if(obj.index == 0) {
          node.style.zIndex = obj.zIndex = 2
          node.style.opacity = obj.opacity = 1
        } else {
          node.style.zIndex = obj.zIndex = 1
          node.style.opacity = obj.opacity = 0.5
        }
        obj.trans = arr
        obj.left = left
        let str = arr.join('px,') + 'px'
        node.style.transform = `translate3d(${str})`
        node.style.left = `${left}px`
        node.style.transition = '.3s'
      },
      // 修改每个元素的 index
      changeIndex(obj,flag) {
        if(flag) {
          obj.index >= 2? obj.index = 0 : obj.index ++
        } else {
          obj.index <= 0? obj.index = 2 : obj.index --
        }
      },
      // 获取每个元素的 index 、z-index 、translate3d 、left 、opacity 、元素本身
      getSpace() {
        let arr = ''
        let str = ''
        let zIndex = ''
        let opacity = 0
        let nodes = this.$refs.swiper_3d.children
        for(let i = 0; i < this.topThree.length; i++) {
          arr = window.getComputedStyle(nodes[i]).transform.split(',')
          str = window.getComputedStyle(nodes[i]).left
          zIndex = window.getComputedStyle(nodes[i]).zIndex
          opacity = window.getComputedStyle(nodes[i]).opacity
          arr = arr.filter((item,index) => {
            return index >= arr.length-4 && index < arr.length-1
          }).map(item => Number(item))
          this.$set(this.items,'item'+i,{})
          this.$set(this.items['item'+i],'node',this.$refs.swiper_3d.children[i])
          this.$set(this.items['item'+i],'trans',arr)
          this.$set(this.items['item'+i],'zIndex',Number(zIndex))
          this.$set(this.items['item'+i],'opacity',Number(opacity))
          this.$set(this.items['item'+i],'index',i)
          this.$set(this.items['item'+i],'left',Number(str.substring(0,str.length-2)))
          this.$set(this.items['item'+i],'bgUrl',this.topThree[i].coverImgUrl)
          this.transArr.push(arr)
          this.leftArr.push(Number(str.substring(0,str.length-2)))
        }
      },
      // 打开对应的歌曲列表页面
      openToSongList(item) {
        if(item.coverImgUrl !== Object.values(this.items).find(val => val.index == 0).bgUrl) return
        this.$emit('openToSongList', item)
      }
    },
    mounted() {
      this.getSpace()
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
    perspective 400px
  }
  .swiper-3d .block {
    width: 130px;
    height: 180px;
    z-index 2
    top 50%
    left 50%
    border-radius 4px
    position absolute
    transform translate3d(-50%,-50%,45px)
    background-color #ffffff
    opacity 1
  }
  .swiper-3d .block:nth-child(2) {
    left 28px
    transform translate3d(0,-50%,-10px)
    z-index 1
    opacity 0.5
  }
  .swiper-3d .block:nth-child(3) {
    z-index 1
    transform translate3d(0,-50%,-10px)
    left 219px
    opacity 0.5
  }
  .block .img {
    width: 100%;
    height: 130px;
    border-top-left-radius 4px
    border-top-right-radius 4px
    overflow hidden
    img {
      width: 100%;
    }
  }
  .block .text {
    height: 50px;
    display flex
    box-sizing border-box
    padding 0 5px
    justify-content center
    font-size 12px
    text-overflow ellipsis
    overflow hidden
    -webkit-line-clamp 2
    display -webkit-box
    -webkit-box-orient vertical
  }
</style>