<template>
  <div class="play-popular">
    <play-popular-scroll :bounce="false" class="play-popular-scroll" :pullUpLoad="true" @pullingUp="pullingUp" ref="playScroll">
      <play-list-item :listItem="list" v-if="list.length !== 0"></play-list-item>
      <van-loading type="spinner" v-show="load" size="20px" color="red"></van-loading>
    </play-popular-scroll>
  </div>
</template>

<script>
  import PlayPopularScroll from "components/common/betterscroll/BScroll";
  import {mixin} from "@/utils/mixin";
  export default {
    name: 'PlayPopular',
    components: {
      PlayPopularScroll
    },
    data() {
      return {
        load: false,
        count: 30,
        list: [],
        cat: '流行'
      }
    },
    props: {
      currentIndex: {
        type: Number,
        default: 0
      },
      index: {
        type: Number,
        default: 0
      }
    },
    mixins: [mixin]
  }
</script>

<style lang="stylus" scoped>
  .play-popular {
    width: 100vw;
    height: calc(100vh - 90px);
  }
  .play-popular-scroll {
    height: 100%;
    .play-list-item {
      padding-top 15px
    }
    .van-loading {
      display flex
      justify-content center
    }
  }
</style>