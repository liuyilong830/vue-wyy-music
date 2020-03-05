<template>
  <div class="home-find" v-if="swiperList.length !== 0">
    <b-scroll class='wrapper-find' :probeType='3'>
      <van-swipe :autoplay="3000" indicator-color="white" class='my-swipe'>
        <van-swipe-item v-for='(item,index) in swiperList' :key='index'>
          <img :src="item.pic || item.imageUrl" alt="">
        </van-swipe-item>
      </van-swipe>
      
      <icon-list :classList='classList' @iconClick='iconClick'></icon-list>

      <recommend :recommend='recommend'></recommend>
      <style-rem></style-rem>

    </b-scroll>
  </div>
</template>

<script>
  import MySwiper from 'components/common/swiper/MySwiper.vue'
  import SwiperList from 'components/common/swiper/SwiperList.vue'
  import IconList from 'components/content/five-icon/IconList'
  import Recommend from './child/Recommend.vue'
  import StyleRem from './child/StyleRem'
  import BScroll from 'components/common/betterscroll/BScroll.vue'
  import { Swipe, SwipeItem } from 'vant'

  import {swiperList,hotSongs6} from 'api/api.js'
  import {mapGetters} from 'vuex'
  export default {
    name: 'Find',
    components: {
      VanSwipe: Swipe,
      VanSwipeItem: SwipeItem,
      Recommend,
      BScroll,
      StyleRem,
      IconList
    },
    data() {
      return {
        swiperList: [],
        account: {},
        recommend: [],
        classList: [
          {title: '每日推荐', cls: 'icon-meirituijian'},
          {title: '歌单', cls: 'icon-gedan'},
          {title: '排行榜', cls: 'icon-paixingbang-copy'},
          {title: '电台', cls: 'icon-diantai'},
          {title: '直播', cls: 'icon-zhibo'}
        ]
      }
    },
    computed: {
      ...mapGetters(['getType','getAccount'])
    },
    methods: {
      onChange() {

      },
      iconClick(index) {
        if(index == 0) {
          this.$router.push('/dailyRem')
        }
      }
    },
    created() {
      this.account = this.getAccount
    },
    mounted() {
      swiperList(this.getType).then(res => {
        if(res.code === 200) {
          this.swiperList = res.banners
        }
      }).catch(err => {
        console.log(err.message)
      })
      hotSongs6().then(res => {
        if(res.code === 200) {
          this.recommend = res.recommend.slice(1,7)
        }
      })
    }
  }
</script>

<style scoped>
  .home-find {
    background-color: #fff;
    width: 100vw;
    height: calc(100vh - 49px);
    padding-top: 49px;
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