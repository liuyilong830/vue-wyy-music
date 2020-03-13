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
    <!-- <top-scroll :bounce='false' :probeType='3' class='x-scroll'>
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
    </top-scroll> -->
    <play-list-det :recommend='recommend'></play-list-det>
  </div>
</template>

<script>
  import More from 'components/content/more/More'
  import PlayListDet from 'components/content/playlist-detail/PlayListDet'
  export default {
    name: 'Recommend',
    components: {
      More,
      PlayListDet
    },
    props: {
      recommend: {
        type: Array,
        default() {
          return []
        }
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
</style>