<template>
  <div class="recommend">
    <p class='title'>推荐歌单</p>
    <div class='text'>
      <div class='blod-title'>为你精挑细选</div>
      <div class='more'><span>查看更多</span></div>
    </div>
    <top-scroll :bounce='false' :probeType='3' class='x-scroll'>
      <div class='recommend-songs'>
        <div class='item' v-for='index in 6' :key='index'>
          <div class='image'>
            <img src='' />
          </div>
          <span class='describe'></span>
        </div>
      </div>
    </top-scroll>
  </div>
</template>

<script>
  import TopScroll from 'components/common/betterscroll/TopScroll.vue'
  export default {
    name: 'Recommend',
    components: {
      TopScroll
    }
  }
</script>

<style lang="stylus" scoped>
  .recommend {
    width 100vw
    padding 0 15px
    box-sizing border-box
    margin 10px 0
  }
  .title {
    color #ccc
    font-size 12px
  }
  .text {
    display flex
    algin-items center
    justify-content space-between
    margin-bottom 10px
  }
  .blod-title {
    font-weight 600
    color #666
    font-size 16px
  }
  .more span{
    display inline-block
    padding 2px 4px
    font-size 12px
    color #666
    border 1px solid #666
    border-radius 12px
  }
  .x-scroll {
    width 100%
  }
  .recommend-songs {
    display flex
    justify-content flex-start
  }
  .item {
    display flex
    flex-direction column
    justify-content space-between
    margin-right 7px
  }
  .recommend-songs .item:last-child {
    margin-right 0
  }
  .image {
    width 100px
    height 100px
    background-color red
    border-radius 15px
  }
  .image img {
    width 100%
  }
  .describe {
    width 100px
    height 40px
    background-color blue
  }
</style>