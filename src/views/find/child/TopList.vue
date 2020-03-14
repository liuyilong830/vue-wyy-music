<template>
  <div class="top-list" v-if="topList.length !== 0">
    <more @upLoadMore='upLoadMoreByStyle'>
      <template v-slot:title>
        <span>排行榜</span>
      </template>
      <template v-slot:blod>
        <span class="name">热歌导航指南</span>
      </template>
      <template v-slot:showMore>
        <span>查看更多</span>
      </template>
    </more>

    <rank-list :topList='topList'></rank-list>
  </div>
</template>

<script>
  import More from 'components/content/more/More'
  import RankList from 'components/content/rank-list/RankList'
  export default {
    name: 'TopList',
    components: {
      More,
      RankList
    },
    props: {
      topList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      upLoadMoreByStyle() {}
    }
  }
</script>

<style lang="stylus" scoped>
  .top-list {
    box-sizing border-box
    padding 0 15px
    margin 10px 0 0
    width 100vw
  }
</style>