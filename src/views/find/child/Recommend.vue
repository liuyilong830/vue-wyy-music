<template>
  <div class="recommend" v-if="recommend.length !== 0">
    <more @upLoadMore='upLoadMoreBySelect'>
      <template v-slot:title>
        <span>推荐歌单</span>
      </template>
      <template v-slot:blod>
        <span>为你精挑细选</span>
      </template>
      <template v-slot:showMore>
        <span>查看更多</span>
      </template>
    </more>
    <top-scroll :bounce='false' :probeType='3' class='x-scroll'>
      <div class='recommend-songs'>

        <song-item v-for="(item,index) in recommend" :key="index">
          <template v-slot:count>
            <span>{{item.playcount | playCount}}</span>
          </template>
          <template v-slot:image>
            <img :src="item.picUrl" alt="">
          </template>
          <template v-slot:describe>
            <span>{{item.copywriter}}</span>
          </template>
        </song-item>

      </div>
    </top-scroll>
  </div>
</template>

<script>
  import TopScroll from 'components/common/betterscroll/TopScroll.vue'
  import SongItem from 'components/content/song-item/SongItem'
  import More from 'components/content/more/More'
  export default {
    name: 'Recommend',
    components: {
      TopScroll,
      SongItem,
      More
    },
    props: {
      recommend: {
        type: Array,
        default() {
          return []
        }
      }
    },
    filters: {
      playCount(value) {
        var value = value.toString()
        if(value.length > 8) {
          return value.substring(0,value.toString().length - 8) + '亿'
        }
        if(value.length >= 5) {
          return value.substring(0,value.toString().length - 4) + '万'
        }
        return value
      }
    },
    methods: {
      upLoadMoreBySelect() {

      }
    }
  }
</script>

<style lang="stylus" scoped>
  .recommend {
    width 100vw
    padding 0 15px
    box-sizing border-box
    margin 10px 0 20px
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
    width 100%
    display flex
    justify-content space-between
  }
  .recommend-songs .item:last-child {
    margin-right 0
  }
</style>