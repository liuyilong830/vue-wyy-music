<template>
  <div class="new-songs-dish" v-if="showStyleRem">
    <more @upLoadMore='upLoadMoreByStyle'>
      <template v-slot:title>
        <span>{{ time | getFormat}}</span>
      </template>
      <template v-slot:blod>
        <span class="name" :class="{active: currentIndex == 0}" @click="showNewSongs">新歌 </span>
        <div class="name dot"></div>
        <span class="name" :class="{active: currentIndex == 1}" @click="showNewDish"> 新碟</span>
      </template>
      <template v-slot:showMore>
        <span>{{currentIndex==0? '更多新歌' : '更多新碟'}}</span>
      </template>
    </more>

    <static-swipe class="static-swipe" :list='show' :flag='currentIndex == 0'></static-swipe>
  </div>
  <van-skeleton v-else :row='6' :row-width='["20%","50%","100%","100%","60%","90%"]'></van-skeleton>
</template>

<script>
  import More from 'components/content/more/More'
  import StaticSwipe from 'components/content/static-swipe/StaticSwipe'
  import { Skeleton } from 'vant';
  export default {
    name: 'NewSongsDish',
    components: {
      More,
      StaticSwipe,
      VanSkeleton: Skeleton
    },
    data() {
      return {
        time: '',
        currentIndex: 0
      }
    },
    props: {
      songDetail: {
        type: Array,
        default() {
          return []
        }
      },
      newDishsList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    filters: {
      getFormat(value) {
        var month = value.getMonth() + 1
        var day = value.getDate()
        return `${month}月${day}日`
      }
    },
    computed: {
      showStyleRem() {
        return this.songDetail.length !== 0 && this.newDishsList.length !==0? true : false
      },
      show() {
        return this.currentIndex == 0? this.songDetail : this.newDishsList
      }
    },
    methods: {
      upLoadMoreByStyle() {

      },
      showNewSongs() {
        this.currentIndex = 0
      },
      showNewDish() {
        this.currentIndex = 1
      }
    },
    created() {
      this.time = new Date()
    }
  }
</script>

<style lang="stylus" scoped>
  .new-songs-dish {
    box-sizing border-box
    padding 0 15px
    margin 10px 0 0
    width 100vw
  }
  .static-swipe {
    width 100%
  }
  .name {
    color #cccccc
    margin-right 5px
  }
  .dot {
    width 2px
    height 60%
    background-color #666
  }
  .active {
    color #666
  }
</style>