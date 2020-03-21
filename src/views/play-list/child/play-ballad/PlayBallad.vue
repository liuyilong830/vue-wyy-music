<template>
  <div class="play-ballad">
    <play-ballad-scroll :bounce="false" class="play-ballad-scroll" :pullUpLoad="true" @pullingUp="pullingUp" ref="playScroll">
      <play-list-item :listItem="list" v-if="list.length !== 0" v-on="$listeners" ref="setHeight"></play-list-item>
      <van-loading type="spinner" v-show="load" size="20px" color="red"></van-loading>
    </play-ballad-scroll>
  </div>
</template>

<script>
  import PlayBalladScroll from "components/common/betterscroll/BScroll";
  import {mixin} from "@/utils/mixin";
  export default {
    name: 'PlayBallad',
    components: {
      PlayBalladScroll
    },
    data() {
      return {
        load: false,
        count: 30,
        list: [],
        cat: '民谣'
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
  .play-ballad {
    width: 100vw;
    height: calc(100vh - 90px);
  }
  .play-ballad-scroll {
    height: 100%;
    .play-list-item {
      padding-top 15px
    }
    .van-loading {
      display flex
      margin-top 30px
      justify-content center
    }
  }
</style>