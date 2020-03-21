<template>
  <div class="play-rap">
    <play-rap-scroll :bounce="false" class="play-rap-scroll" :pullUpLoad="true" @pullingUp="pullingUp" ref="playScroll">
      <play-list-item :listItem="list" v-if="list.length !== 0" v-on="$listeners" ref="contain"></play-list-item>
      <van-loading type="spinner" v-show="load" size="20px" color="red"></van-loading>
    </play-rap-scroll>
  </div>
</template>

<script>
  import PlayRapScroll from "components/common/betterscroll/BScroll";
  import {mixin} from "../../../../utils/mixin";
  export default {
    name: 'PlayRap',
    components: {
      PlayRapScroll,
    },
    data() {
      return {
        list: [],
        count: 30,
        load: false,
        cat: '说唱'
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
  .play-rap {
    width: 100vw;
    height: calc(100vh - 90px);
  }
  .play-rap-scroll {
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