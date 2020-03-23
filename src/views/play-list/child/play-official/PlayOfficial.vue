<template>
  <div class="play-official">
    <play-official-scroll :bounce="false" class="play-official-scroll" :pullUpLoad="true" @pullingUp="pullingUp" ref="playScroll">
      <div ref="contain">
        <play-list-item :listItem="list" v-if="list.length !== 0" v-on="$listeners"></play-list-item>
        <van-loading type="spinner" v-show="load" size="20px" color="red"></van-loading>
      </div>
    </play-official-scroll>
  </div>
</template>

<script>
  import PlayOfficialScroll from "components/common/betterscroll/BScroll";
  import {mixin} from "@/utils/mixin";
  export default {
    name: 'PlayOfficial',
    components: {
      PlayOfficialScroll
    },
    data() {
      return {
        list: [],
        count: 30,
        load: false,
        cat: '官方'
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
  .play-official {
    width: 100vw;
    height: calc(100vh - 90px);
  }
  .play-official-scroll {
    height 100%
    .play-list-item {
      padding-top 15px
    }
    .van-loading {
      display flex
      margin-top 15px
      justify-content center
    }
  }
</style>