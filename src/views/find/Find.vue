<template>
  <div class="home-find" v-if="swiperList.length !== 0">
    <b-scroll class='wrapper-find' :probeType='3' ref="wrapper_find">
      <van-swipe :autoplay="3000" indicator-color="white" class='my-swipe'>
        <van-swipe-item v-for='(item,index) in swiperList' :key='index'>
          <img :src="item.pic || item.imageUrl" alt="">
        </van-swipe-item>
      </van-swipe>
  
      <icon-list :classList='classList' @iconClick='iconClick'></icon-list>
  
      <recommend :recommend='recommend'></recommend>
      <style-rem :playlists='playlist' :songDetail='styleRecom' :styleRecomUrl="styleRecomUrl"></style-rem>
      <scene-rem :sceneRecom='sceneRecom'></scene-rem>
      <new-songs-dish :songDetail='newSongsList' :newDishsList='newDishsList' :newSongsListUrl="newSongsListUrl"></new-songs-dish>
      <top-list :topList='topList5' v-if="topList5.length == 5"></top-list>
      <dj-program :djprogram="djprogramList"></dj-program>
  
      <div class="refresh">
        <span class="btn" @click="refreshClick">点击刷新</span>
        <span class="refresh-text">换一批内容</span>
      </div>
    </b-scroll>
    <!--<div class="scroll">
    
    </div>-->
  </div>
</template>

<script>
  import IconList from 'components/content/five-icon/IconList'
  import Recommend from './child/Recommend.vue'
  import StyleRem from './child/StyleRem'
  import SceneRem from './child/SceneRem'
  import NewSongsDish from './child/NewSongsDish'
  import TopList from './child/TopList'
  import DjProgram from './child/DjProgram'
  import BScroll from 'components/common/betterscroll/BScroll.vue'
  import { Swipe, SwipeItem } from 'vant'

  import {swiperList,hotSongs6,sceneRecom,playDetail,styleRecom,newSong,getCatlist,newDish,getTopList,getDjprogram,songDetail} from 'api/api.js'
  import { mapGetters } from 'vuex'
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
      NewSongsDish,
      TopList,
      DjProgram
    },
    data() {
      return {
        swiperList: [],
        account: {},
        recommend: [],
        sceneRecom: [],
        playlist: {},
        styleRecom: [],
        styleRecomUrl: [],
        newSongsList: [],
        newSongsListUrl: [],
        classList: [
          {title: '每日推荐', cls: 'icon-meirituijian'},
          {title: '歌单', cls: 'icon-gedan'},
          {title: '排行榜', cls: 'icon-paixingbang-copy'},
          {title: '电台', cls: 'icon-diantai'},
          {title: '直播', cls: 'icon-zhibo'}
        ],
        style: [],  // 风格
        scene: [],  // 场景
        emotion: [], // 情感
        theme: [], // 主题
        languages: [], // 语种
        newDishsList: [],  // 新碟
        topList5: [],
        djprogramList: []
      }
    },
    computed: {
      ...mapGetters(['getType','getAccount','getSongObj']),
      showFindPage() {
        return this.styleRecom.length !== 0
      }
    },
    methods: {
      refreshClick() {
        history.go(0)
      },
      onChange() {

      },
      iconClick(index) {
        if(index === 0) {
          this.$router.push('/dailyRem')
        } else if(index === 1) {
          this.$router.push('/playlist')
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
      asyncSceneRecom(name) {
        sceneRecom(name).then(res => {
          if(res.code === 200) {
            if(this.sceneRecom.length !== 0) return;
            for(let i = 0; i < 6; i++) {
              this.sceneRecom.push(res.playlists[i])
            }
          }
        }).catch(err => err.message)
      },
      asyncStyleRecom(name) {
        styleRecom(name).then(res => {
          if(res.code === 200) {
            return res.playlists[0].id
          }
        })
        .then(id => {
          return playDetail(id).then(data => {
            if(data.code === 200) {
              this.playlist = data.playlist;
              if(this.styleRecom.length === 12) return;
              var list = data.playlist
              for(let i = 0; i < 12; i++) {
                if(list.tracks[i]) {
                  this.styleRecom.push(list.tracks[i])
                }
              }
              return this.styleRecom.map(item => item.id)
            }
          })
        })
        .then(arr => {
          songDetail(arr).then(res => {
            this.styleRecomUrl = res.data
          })
        })
      },
      asyncNewSong() {
        return newSong().then(res => {
          if(this.newSongsList.length !== 0) return
          if(res.code === 200) {
            for(let i = 0; i < 6; i++) {
              this.newSongsList.push(res.result[i])
            }
            return this.newSongsList.map(item => item.id)
          }
        })
        .then(arr => {
          songDetail(arr).then(res => {
            this.newSongsListUrl = res.data
          })
        })
      },
      asyncGetCatlist() {
        if(this.languages.length !== 0) return
        getCatlist().then(res => {
          if(res.code === 200) {
            for(let item of res.sub) {
              if(item.category === 0) this.languages.push(item)
              if(item.category === 1) this.style.push(item)
              if(item.category === 2) this.scene.push(item)
              if(item.category === 3) this.emotion.push(item)
              if(item.category === 4) this.theme.push(item)
            }
          }
          this.asyncStyleRecom(this.style[Math.floor(Math.random()* this.style.length)].name)
          this.asyncSceneRecom(this.scene[Math.floor(Math.random()* this.scene.length)].name)
        })
      },
      asyncNewDish() {
        newDish().then(res => {
          if(this.newDishsList.length !== 0) return
          if(res.code == 200) {
            for(let i = 0; i < res.albums.length; i++) {
              this.newDishsList.push(res.albums[i])
            }
          }
        })
      },
      asyncTopList(num) {
        if(this.topList5.length !== 0) return;
        let arr = [];
        for(let item of this.randomNum(num,34)) {
          getTopList(item).then(res => {
            if(res.code === 200) {
              this.topList5.push(res.playlist)
            }
          })
        }
      },
      asyncDjprogram() {
        getDjprogram().then(res => {
          if(res.code === 200) {
            this.djprogramList = res.result
          }
        })
      },
      /**
       * 输入需要得到的随机数的个数和可选的范围，返回一个数组，里面包含随机项的数字
       */
      randomNum(n,end) {
        var initArr = []
        for(var k = 0; k < end; k++) {
          initArr.push(k)
        }
        var arr = []
        var num = 0
        var index = 0
        var length = initArr.length
        while(length > 0) {
          num = Math.floor(Math.random()*initArr.length)
          arr.push(initArr[num])
          initArr.splice(num,1)
          if(arr.length == n) break
        }
        return arr
      }
    },
    created() {
      this.account = this.getAccount
    },
    mounted() {
      this.asyncSwipe()
      this.asyncHotSongs()
      this.asyncGetCatlist()
      this.asyncNewSong()
      this.asyncNewDish()
      this.asyncTopList(5)
      this.asyncDjprogram()
    },
    watch: {
      getSongObj(val,oldVal) {
        this.$nextTick(() => {
          this.$refs.wrapper_find.$el.children[0].style.paddingBottom = '45px'
        })
      }
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
  .refresh {
    width: 150px;
    height: 30px;
    line-height: 30px;
    margin: 0 auto;
    font-size: 13px;
    text-align: center;
  }
  .refresh .btn {
    color: #2fc1f1;
  }
  .refresh .refresh-text {
    color: #cccccc;
    padding-left: 7px;
  }
  .scroll {
    height: calc(100vh - 49px);
    overflow-x: hidden;
    overflow-y: auto;
  }
  .scroll::-webkit-scrollbar{
    width: 0 !important;
    display:none;
  }
</style>