<template>
  <div class="top-scroll-recom" v-if="list.length !== 0">
    <div class="scroll">
      <div class="content" ref="content">
        <div class="recom-item" v-for="(item,index) in list" :key="index" @click="jumpRecom(index)" :class="{active: currentIndex == index}">{{item.name}}</div>
        
      </div>
      <div class="border" ref="border">
        <div class="active-border" ref="active_border"></div>
      </div>
    </div>
    <div class="recom-icon" @click="showAllRecommend">
      <span class="iconfont icon-leimupinleifenleileibie1"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TopScrollRecom',
    components: {},
    data() {
      return {
        space: 0,  // 记录两个元素之间的间隔距离
        marginLeft: 0,
        marginRight: 0,
        contentWidth: 0,
        itemsWidth: [],
        offsetX: 0
      }
    },
    props: {
      list: {
        type: Array,
        default() {
          return []
        }
      },
      currentIndex: {
        type: Number,
        default: 0
      }
    },
    methods: {
      jumpRecom(index) {
        this.$emit('setCurrentIndex', index)
      },
      showAllRecommend() {
        this.$emit('showAllRecommend')
      },
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
        this.$refs.content.style.width = this.$refs.border.style.width = (this.contentWidth - this.marginLeft) + 'px'
        
      },
      changeIndex(index) {
        this.$refs.active_border.style.width = this.itemsWidth[index] + 'px'
        for(let i = 0; i < index; i++) {
          this.offsetX += this.itemsWidth[i]
        }
        this.$refs.active_border.style.transform = `translateX(${index * (this.marginLeft + this.marginRight) + this.offsetX}px)`
        this.$refs.active_border.style.transition = '.3s'
        this.offsetX = 0
      }
    },
    mounted() {
      this.getContentWidth()
      if(this.currentIndex !== 0) {
        this.changeIndex(this.currentIndex)
      }
    },
    watch: {
      list(val,oldVal) {
        this.$refs.content.style.width = '10000px'
        this.$nextTick(() => {
          /*this.contentWidth = 0
          this.itemsWidth = []*/
          if(val.length > oldVal.length) {
            this.contentWidth += this.getNodeLength(this.$refs.content.children[this.$refs.content.children.length-1])
          } else {
            let index = 0
            for(let key in val) {
              if(val[key].name !== oldVal[key].name) return index = key
            }
            this.contentWidth -= (this.itemsWidth[index] + this.marginRight + this.marginLeft)
            this.itemsWidth.splice(index, 1)
          }
          this.$refs.content.style.width = this.$refs.border.style.width = (this.contentWidth - this.marginLeft) + 'px'
          // this.getContentWidth()
        })
      },
      currentIndex(val,oldVal) {
        this.changeIndex(val)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .top-scroll-recom {
    width: 100vw;
    height: 40px;
    box-sizing border-box
    padding 5px 15px 0
    display flex
    border-bottom 1px solid rgba(245, 245, 245, 0.7)
    color #292828
  }
  .scroll {
    width: calc(100% - 30px);
    overflow-y hidden
    overflow-x auto
  }
  .scroll::-webkit-scrollbar{
    width: 0 !important
    display:none;
  }
  .scroll .content {
    width 1000px
    height: (100% - 5px);
    display flex
    align-items center
    padding-top 5px
    box-sizing border-box
    font-size 16px
    .recom-item {
      margin 0 22px
      text-align center
    }
    .active {
      color #e61818
    }
    .border {
      width: 600px;
      height: 5px;
      position absolute
      bottom 0
      .active-border {
        width: 32px;
        height: 3px;
        background-color #e61818
      }
    }
  }
  .border {
    width: 600px;
    height: 5px;
    bottom 0
    .active-border {
      width: 32px;
      height: 3px;
      background-color #e61818
    }
  }
  .scroll .content .recom-item:first-child {
    margin-left 0
  }
  .recom-icon {
    width: 30px;
    height: 100%;
    display flex
    justify-content flex-end
    align-items center
  }
  .recom-icon .iconfont {
    font-size 21px
  }
</style>