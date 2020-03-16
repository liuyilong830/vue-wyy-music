<template>
  <div class="top-scroll-recom">
    <div class="scroll">
      <div class="content" ref="content">
        <div class="recom-item" v-for="(item,index) in list" :key="index" @click="jumpRecom(index)" :class="{active: currentIndex == index}">{{item}}</div>
        <div class="border">
          <div class="active-border" ref="active_border"></div>
        </div>
      </div>
    </div>
    <div class="recom-icon">
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
        list: ['推荐','官方','精品','华语','说唱','流行','民谣','电子'],
        currentIndex: 0,
        space: 0,  // 记录两个元素之间的间隔距离
        nodeWidth: 0
      }
    },
    methods: {
      jumpRecom(index) {
        this.currentIndex = index
        this.$refs.active_border.style.transform = `translateX(${index * (this.nodeWidth + this.space)}px)`
        this.$refs.active_border.style.transition = '.3s'
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
    height: 49px;
    box-sizing border-box
    padding 10px 15px 0
    display flex
    border-bottom 1px solid #f5f5f5
  }
  .scroll {
    width: calc(100% - 30px);
    background-color #f5f5f5
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
      color indianred
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
        background-color indianred
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