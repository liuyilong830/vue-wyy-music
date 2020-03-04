<template>
  <div class="home-find" v-if="swiperList.length !== 0">
    <!-- <vuescroll class="vue-scroll">
      <van-swipe :autoplay="3000" indicator-color="white" class='my-swipe'>
        <van-swipe-item v-for='(item,index) in swiperList' :key='index'>
          <img :src="item.pic" alt="">
        </van-swipe-item>
      </van-swipe>
      <icon></icon>
      <recommend></recommend>
      发现
    </vuescroll> -->
    <b-scroll class='wrapper-find' :probeType='3'>
      <van-swipe :autoplay="3000" indicator-color="white" class='my-swipe'>
        <van-swipe-item v-for='(item,index) in swiperList' :key='index'>
          <img :src="item.pic" alt="">
        </van-swipe-item>
      </van-swipe>
      <icon></icon>
      <recommend></recommend>
    </b-scroll>
  </div>
</template>

<script>
  import vuescroll from 'vuescroll'
  import MySwiper from 'components/common/swiper/MySwiper.vue'
  import SwiperList from 'components/common/swiper/SwiperList.vue'
  import Icon from './child/Icon.vue'
  import Recommend from './child/Recommend.vue'
  import BScroll from 'components/common/betterscroll/BScroll.vue'
  import { Swipe, SwipeItem } from 'vant'

  import {swiperList} from 'api/api.js'
  import {mapGetters} from 'vuex'
  export default {
    name: 'Find',
    components: {
      vuescroll,
      VanSwipe: Swipe,
      VanSwipeItem: SwipeItem,
      Icon,
      Recommend,
      BScroll
    },
    data() {
      return {
        ops: {
          vuescroll: {
            sizeStrategy: 'percent'
          },
          scrollPanel: {
            scrollingX: false
          }
        },
        swiperList: []
      }
    },
    computed: {
      ...mapGetters(['getType'])
    },
    methods: {
      onChange() {

      }
    },
    mounted() {
      swiperList(this.getType).then(res => {
        if(res.code === 200) {
          this.swiperList = res.banners
        }
      }).catch(err => {
        console.log(err.message)
      })
    }
  }
</script>

<style scoped>
  .home-find {
    background-color: #fff;
    width: 100vw;
  }
  .wrapper-find {
    height: calc(100vh - 49px);
  }
  .my-swipe {
    width: 100vw;
  }
  .van-swipe-item {
    box-sizing: border-box;
    padding: 0 15px;
  }
  .van-swipe-item img {
    width: 100%;
    vertical-align: top;
    border-radius: 15px;
  }
</style>