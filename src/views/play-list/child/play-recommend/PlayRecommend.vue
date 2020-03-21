<template>
  <div class="play-recommend">
    <play-scroll class="play-scroll" :bounce="false" :pullUpLoad="true" @pullingUp="pullingUp" ref="playScroll">
      <swiper3-d :topThree="getTopThree" v-if="getTopThree.length !== 0" v-on="$listeners"></swiper3-d>
      <play-list-item :listItem="getSurPlus" v-if="getSurPlus.length !== 0" v-on="$listeners" ref="contain"></play-list-item>
      <van-loading type="spinner" v-show="load" size="20px" color="red"></van-loading>
    </play-scroll>
  </div>
</template>

<script>
  import Swiper3D from './child/Swiper3D'
  import PlayScroll from "components/common/betterscroll/BScroll";
  import PlayListItem from '../PlayListItem'
  // ui 框架
  import { Loading } from 'vant';
  
  // 网络请求相关api
  import {topPlayList} from 'api/api.js'
  export default {
    name: 'PlayRecommend',
    components: {
      Swiper3D,
      PlayScroll,
      PlayListItem,
      VanLoading: Loading
    },
    data() {
      return {
        count: 33,
        playList: [],
        load: false
      }
    },
    computed: {
      getTopThree() {
        let arr = []
        if(this.playList.length !== 0) {
          arr = [this.playList[0],this.playList[1],this.playList[2]]
        }
        return arr
      },
      getSurPlus() {
        return this.playList.filter((item,index) => index > 2)
      }
    },
    methods: {
      asyncGetPlayList(num) {
        this.load = true
        topPlayList(num).then(res => {
          if(res.code === 200) {
            if(this.playList.length == 0) {
              this.$emit('setActiveImg', res.playlists[0].coverImgUrl)
            }
            this.playList.push(...res.playlists.filter((item,index) => index >= this.playList.length))
            this.$refs.playScroll.finishPullUp()
            this.count = this.playList.length
            this.load = false
          }
        })
      },
      pullingUp(scroll) {
        this.asyncGetPlayList(this.count + 30)
      }
    },
    mounted() {
      this.asyncGetPlayList(this.count)
    }
  }
</script>

<style lang="stylus" scoped>
  .play-recommend {
    height: calc(100vh - 90px);
  }
  .van-loading {
    display flex
    margin-top 30px
    justify-content center
  }
  .play-scroll {
    height 100%
  }
</style>