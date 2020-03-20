<template>
  <div class="play-chinese">
    <play-chinese-scroll :bounce="false" class="play-chinese-scroll" :pullUpLoad="true" @pullingUp="pullingUp" ref="playScroll">
      <play-list-item :listItem="list" v-if="list.length !== 0"></play-list-item>
      <van-loading type="spinner" v-show="load" size="20px" color="red"></van-loading>
    </play-chinese-scroll>
  </div>
</template>

<script>
  import PlayChineseScroll from "components/common/betterscroll/BScroll"
  import {mixin} from "../../../../utils/mixin";
  export default {
    name: 'PlayChinese',
    components: {
      PlayChineseScroll
    },
    data() {
      return {
        list: [],
        count: 30,
        load: false,
        cat: '华语'
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
  .play-chinese {
    width: 100vw;
    height: calc(100vh - 90px);
  }
  .play-chinese-scroll {
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