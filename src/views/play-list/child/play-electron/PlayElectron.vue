<template>
  <div class="play-electron">
    <play-electron-scroll :bounce="false" class="play-electron-scroll" :pullUpLoad="true" @pullingUp="pullingUp" ref="playScroll">
      <play-list-item :listItem="list" v-if="list.length !== 0" v-on="$listeners" ref="contain"></play-list-item>
      <van-loading type="spinner" v-show="load" size="20px" color="red"></van-loading>
    </play-electron-scroll>
  </div>
</template>

<script>
  import PlayElectronScroll from "components/common/betterscroll/BScroll";
  import {mixin} from "@/utils/mixin";
  export default {
    name: 'PlayElectron',
    components: {
      PlayElectronScroll
    },
    data() {
      return {
        load: false,
        count: 30,
        list: [],
        cat: '电子'
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
  .play-electron {
    width: 100vw;
    height: calc(100vh - 90px);
    .play-electron-scroll {
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
  }
</style>