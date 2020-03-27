<template>
  <div class="result-search">
    <div class="scroll-x">
      <ul class="content" ref="content">
        <li class="content-item" v-for="(item,index) in list" :key="index" @click="jumpToPost(index)" :class="{active: currentIndex == index}">{{item}}</li>
      </ul>
      <div class="solid" ref="border">
        <div class="active-solid" ref="active_border"></div>
      </div>
    </div>
    <div class="scroll">
      <scroll-views :list="list" v-bind="$attrs" @changeIndex="changeIndex" :index="currentIndex"></scroll-views>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import ScrollViews from 'components/common/scroll-views/ScrollViews'
  export default {
    name: 'ResultSearch',
    components: {
      ScrollViews,
      NavBar
    },
    data() {
      return {
        list: ['综合','单曲','云村','视频','歌手','专辑','歌单','主播电台','用户'],
        marginLeft: 0,
        marginRight: 0,
        contentWidth: 0,
        itemsWidth: [],
        currentIndex: 0,
        offsetX: 0
      }
    },
    methods: {
      getNodeLength(dom) {
        let nodeWidth = window.getComputedStyle(dom).width
        this.itemsWidth.push(Number(nodeWidth.substring(0,nodeWidth.length-2)))
        return this.marginLeft + this.marginRight + Number(nodeWidth.substring(0,nodeWidth.length-2))
      },
      getContentWidth() {
        let marginLeft = window.getComputedStyle(this.$refs.content.children[1]).marginLeft
        let marginRight = window.getComputedStyle(this.$refs.content.children[1]).marginRight
        this.marginLeft = Number(marginLeft.substring(0,marginLeft.length-2))
        this.marginRight = Number(marginRight.substring(0,marginRight.length-2))
        for(let i = 0; i < this.list.length; i++) {
          this.contentWidth += this.getNodeLength(this.$refs.content.children[i])
        }
        this.$refs.content.style.width = this.$refs.border.style.width = this.contentWidth + 'px'
    
      },
      jumpToPost(index) {
        this.currentIndex = index
      },
      changeIndex(index) {
        this.jumpToPost(index)
      }
    },
    mounted() {
      this.getContentWidth()
      this.$refs.active_border.style.transform = `translateX(${this.marginLeft}px)`
    },
    watch: {
      currentIndex(val) {
        this.$refs.active_border.style.width = this.itemsWidth[val] + 'px'
        for(let i = 0; i < val; i++) {
          this.offsetX += this.itemsWidth[i]
        }
        this.$refs.active_border.style.transform = `translateX(${this.offsetX + this.marginLeft*(val+1) + this.marginRight*val}px)`
        this.$refs.active_border.style.transition = '.3s'
        this.offsetX = 0
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .result-search {
    width: 100%;
    height: 100vh;
    box-sizing border-box
    background-color #ffffff
    height: calc(100vh - 50px);
    .scroll-x {
      overflow-x auto
      overflow-y hidden
      height: 32px;
      border-bottom 1px solid #cccccc54
      .content {
        width: 200vw;
        height: 30px;
        overflow hidden
        display flex
        align-items center
        .content-item {
          font-size 15px
          font-weight 600
          color #6b6b6b
          margin 0 15px
          float left
        }
        .active {
          color red
        }
      }
      .solid {
        height: 2px;
        width: 200vw;
        display flex
        align-items flex-end
        .active-solid {
          height: 2px;
          width: 30px;
          background-color red
        }
      }
    }
    .scroll-x::-webkit-scrollbar{
      width: 0 !important
      display:none;
    }
    .scroll {
      height: calc(100% - 33px);
    }
  }
</style>