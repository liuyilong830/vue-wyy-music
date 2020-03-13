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
      <style-rem :playlists='playlist' :songDetail='styleRecom'></style-rem>
      <scene-rem :sceneRecom='sceneRecom'></scene-rem>
      <new-songs-dish :songDetail='newSongsList'></new-songs-dish>
    </b-scroll>
  </div>
</template>

<script>
  import MySwiper from 'components/common/swiper/MySwiper.vue'
  import SwiperList from 'components/common/swiper/SwiperList.vue'
  import IconList from 'components/content/five-icon/IconList'
  import Recommend from './child/Recommend.vue'
  import StyleRem from './child/StyleRem'
  import SceneRem from './child/SceneRem'
  import NewSongsDish from './child/NewSongsDish'
  import BScroll from 'components/common/betterscroll/BScroll.vue'
  import { Swipe, SwipeItem } from 'vant'

  import {swiperList,hotSongs6,sceneRecom,playDetail,styleRecom,newSong} from 'api/api.js'
  import {mapGetters,mapActions,mapState} from 'vuex'
  export default {
    name: 'Find',
    components: {
      VanSwipe: Swipe,
      VanSwipeItem: SwipeItem,
      Recommend,
      BScroll,
      StyleRem,
      IconList,
      SceneRem,
      NewSongsDish
    },
    data() {
      return {
        swiperList: [],
        account: {},
        recommend: [],
        sceneRecom: [],
        playlist: {},
        styleRecom: [],
        newSongsList: [],
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
      ...mapGetters(['getType','getAccount']),
      showFindPage() {
        return this.styleRecom.length !== 0? true : false
      }
    },
    methods: {
      onChange() {

      },
      iconClick(index) {
        if(index == 0) {
          this.$router.push('/dailyRem')
        }
      },
      // 请求轮播图数据
      asyncSwipe() {
        swiperList(this.getType).then(res => {
          if(res.code === 200) {
            this.swiperList = res.banners
          }
        }).catch(err => {
          console.log(err.message)
        })
      },
      // 请求推荐歌单
      asyncHotSongs() {
        hotSongs6().then(res => {
          if(res.code === 200) {
            this.recommend = res.recommend.slice(1,7)
          }
        }).catch(err => err.message)
      },
      asyncSceneRecom() {
        sceneRecom('酒吧').then(res => {
          if(res.code === 200) {
            if(this.sceneRecom.length !== 0) return 
            for(var i = 0; i < 6; i++) {
              this.sceneRecom.push(res.playlists[i])
            }
          }
        }).catch(err => err.message)
      },
      asyncStyleRecom() {
        styleRecom('说唱').then(res => {
          if(res.code === 200) {
            return res.playlists[0].id
          }
        })
        .then(id => {
          playDetail(id).then(data => {
            if(data.code === 200) {
              this.playlist = data.playlist
              if(this.styleRecom.length == 12) return 
              for(var i = 0; i < 12; i++) {
                this.styleRecom.push(data.playlist.tracks[i])
              }
            }
          })
        })
      },
      asyncNewSong() {
        newSong().then(res => {
          if(this.newSongsList.length !== 0) return
          if(res.code == 200) {
            for(var i = 0; i < 6; i++) {
              this.newSongsList.push(res.result[i])
            }
          }
        })
      }
    },
    created() {
      this.account = this.getAccount
    },
    mounted() {
      this.asyncSwipe()
      this.asyncHotSongs()
      this.asyncStyleRecom()
      this.asyncSceneRecom()
      this.asyncNewSong()
    }
  }
</script>

<style scoped>
  .home-find {
    background-color: #fff;
    width: 100vw;
    height: calc(100vh - 49px);
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