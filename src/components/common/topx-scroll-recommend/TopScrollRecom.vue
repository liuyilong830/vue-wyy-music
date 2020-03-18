<template>
  <div class="top-scroll-recom">
    <div class="scroll">
      <div class="content" ref="content">
        <div class="recom-item" v-for="(item,index) in list" :key="index" @click="jumpRecom(index)" :class="{active: currentIndex == index}">{{item.name}}</div>
        <div class="border">
          <div class="active-border" ref="active_border"></div>
        </div>
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
        list: [
          {name: '推荐', path: '/playlist/recommend'},
          {name: '官方', path: '/playlist/official'},
          {name: '精品', path: '/playlist/boutique'},
          {name: '华语', path: '/playlist/chinese'},
          {name: '说唱', path: '/playlsit/rap'},
          {name: '流行', path: '/playlsit/popular'},
          {name: '民谣', path: '/playlsit/ballad'},
          {name: '电子', path: '/playlsit/electron'},
        ],
        currentIndex: 0,
        space: 0,  // 记录两个元素之间的间隔距离
        nodeWidth: 0
      }
    },
    methods: {
      jumpRecom(index) {
        this.currentIndex = index
        this.$router.replace(this.list[this.currentIndex].path)
        this.$refs.active_border.style.transform = `translateX(${index * (this.nodeWidth + this.space)}px)`
        this.$refs.active_border.style.transition = '.3s'
      },
      showAllRecommend() {
        this.$emit('showAllRecommend')
      }
    },
    mounted() {
      this.nodeWidth = this.$refs.content.children[0].getBoundingClientRect().width
      this.space = this.$refs.content.children[1].getBoundingClientRect().x - this.$refs.content.children[0].getBoundingClientRect().x - this.nodeWidth
    }
  }
</script>

<style lang="stylus" scoped>
  .top-scroll-recom {
    width: 100vw;
    height: 50px;
    box-sizing border-box
    padding 10px 15px 0
    display flex
    border-bottom 1px solid #f5f5f547
    color #292828
  }
  .scroll {
    width: calc(100% - 30px);
    overflow auto
  }
  .scroll::-webkit-scrollbar{
    width: 0 !important
    display:none;
  }
  .scroll .content {
    width 600px
    height: 100%;
    display flex
    justify-content space-between
    padding-top 5px
    box-sizing border-box
    font-size 16px
    position relative
    .recom-item {
    
    }
    .active {
      color #e61818
      font-weight bold
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