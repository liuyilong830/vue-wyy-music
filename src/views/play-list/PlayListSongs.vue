<template>
  <transition name="list">
    <div class="play-list-songs" v-if="$attrs.val1 && Object.keys(obj).length !== 0">
      <nav-bar @confirmBack='confirmBack' class="nav-bar" ref="navbar">
        <template v-slot:left>
          <span class="iconfont icon-arrow-prev"></span>
        </template>
        <template v-slot:center>
          <span class="title">歌单</span>
        </template>
        <template v-slot:right>
          <span class="iconfont icon-sousuo"></span>
        </template>
      </nav-bar>
      <!-- 这里面是伪造的元素 -->
      <div class="position" v-show="flag">
        <img :src="obj.coverImgUrl" class="coverimg" alt="">
        <div class="contain-top">
          <p class="playAll">
            <span class="iconfont icon-bofang"></span>
            <span>播放全部</span>
            <span class="track-count">(共{{obj.trackCount}}首)</span>
          </p>
          <div class="selected-more">
            <p class="collection">
              <span>+ 收藏({{obj.subscribedCount}})</span>
            </p>
          </div>
        </div>
      </div>
      
      <b-scroll class="songs-scroll" :bounce='false' :probeType='3' @positionY='positionY' ref="dailyScroll">
        <div class="image" ref="image">
          <div class="flex">
            <div class="background-img">
              <img :src="obj.coverImgUrl" ref="mask" alt="">
            </div>
            <div class="describe">
              <h2 class="name">{{obj.name}}</h2>
              <div class="author">
                <img :src="obj.creator.avatarUrl" alt="">
                <span class="nickname">{{obj.creator.nickname}} ></span>
              </div>
              <span class="description">{{obj.description}}</span>
            </div>
          </div>
          <div class="operation">
            <div class="operation-item">
              <span class="iconfont icon-pinglun2"></span>
              <span class="text">{{obj.commentCount}}</span>
            </div>
            <div class="operation-item">
              <span class="iconfont icon-fenxiang1-copy"></span>
              <span class="text">{{obj.shareCount}}</span>
            </div>
            <div class="operation-item">
              <span class="iconfont icon-xiazai-copy"></span>
              <span class="text">下载</span>
            </div>
            <div class="operation-item">
              <span class="iconfont icon-duoxuan"></span>
              <span class="text">多选</span>
            </div>
          </div>
          <img :src="obj.coverImgUrl" class="coverimg" ref="mask" alt="">
        </div>
        <div class="contain" ref="contain">
          <div class="contain-top" ref="containTop">
            <p class="playAll">
              <span class="iconfont icon-bofang"></span>
              <span>播放全部</span>
              <span class="track-count">(共{{obj.trackCount}}首)</span>
            </p>
            <div class="selected-more">
              <p class="collection">
                <span>+ 收藏({{obj.subscribedCount | playCountFilter}})</span>
              </p>
            </div>
          </div>
          <div v-if="!load">
            <song v-for="(item,index) in songs" :key="index" ref="song" @click.native="playerClick(item.id)">
              <template v-slot:img>
                <div class="number">
                  <span>{{index+1}}</span>
                </div>
              </template>
              <template v-slot:playing>
                <span class="iconfont icon-youshenglaba"></span>
              </template>
              <template v-slot:songName>{{item.name}}</template>
              <template v-slot:artists>
                <span>{{item.ar[0].name}}</span>-<span>{{item.al.name}}</span>
              </template>
            </song>
          </div>
          <van-loading type="spinner" v-show="load"/>
        </div>
      </b-scroll>
    </div>
  </transition>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import BScroll from 'components/common/betterscroll/BScroll'
  import Song from 'components/content/song/Song'
  import {getPlayListDetail,songDetail} from 'api/api.js'
  import {Loading,Toast} from "vant";
  import {mapGetters} from "vuex";
  export default {
    name: 'PlayListSongs',
    components: {
      NavBar,
      BScroll,
      Song,
      VanLoading: Loading,
    },
    data() {
      return {
        obj: {},
        flag: false,
        offsetTop: 0,
        posY: 0,
        navbarH: 0,
        songs: [],
        load: false,
        songWidth: 0,
        songIdArr: [],
        realSongDet: [],
        songObj: {}
      }
    },
    model: {
      prop: 'val1',
      event: 'click'
    },
    props: {
      songDet: {
        type: Object,
        defalut() {
          return {}
        }
      }
    },
    filters: {
      playCountFilter(value) {
        if(!value) return ''
        let val = value.toString()
        if(val.length > 8) {
          return val.substring(0,val.toString().length - 8) + '亿'
        }
        if(val.length >= 5) {
          return val.substring(0,val.toString().length - 4) + '万'
        }
        return val
      }
    },
    computed: {
      ...mapGetters(['getSongObj','getShowSong']),
    },
    methods: {
      confirmBack() {
        this.$emit('click', !this.$attrs.val1)
      },
      playerClick(id) {
        this.songObj = this.realSongDet.find(item => item.id == id)
        if(!this.songObj.url) {
          Toast('此歌曲需要网易云音乐vip用户才能收听!')
          return
        }
        // 默认随便点击一首都是将整个列表都加入到播放列表中
        this.$store.commit('setSongList', {songs: this.songs , songsDetail: this.realSongDet})
        this.$store.commit('changeSongObj',this.songObj)
        // 显示音乐播放器
        this.$store.commit('showMusicPlayer', true)
      },
      positionY(position) {
        this.posY = Math.abs(position.y)
      },
      getHeight(length) {
        this.songWidth = this.$refs.song[0].$el.getBoundingClientRect().height
        return length* this.songWidth + this.$refs.containTop.getBoundingClientRect().height + 'px'
      },
      asyncGetPlayListDetail(id) {
        this.load = true
        getPlayListDetail(id).then(res => {
          if(res.code === 200) {
            this.songs = res.playlist.tracks
            this.load = false
            this.$nextTick(() => {
              this.$refs.contain.style.height = this.getHeight((this.songs.length))
            })
            this.asyncGetSongsDetail()
          }
        })
      },
      // 获取歌曲列表所有歌曲的详情数据
      asyncGetSongsDetail() {
        this.songIdArr = this.songs.map(item => item.id)
        songDetail(this.songIdArr).then(res => {
          if(res.code === 200) {
            let songDet = res.data
            for(let key in this.songIdArr) {
              // 因为顺序传入的id值获取到的值不是顺序的，所有我们需要将songs中的每一项对应于详情数据
              this.realSongDet.push(songDet.find(item => item.id == this.songIdArr[key]))
            }
          }
        })
      }
    },
    watch: {
      songDet(val,oldVal) {
        this.obj = val
        this.$nextTick(() => {
          this.offsetTop = this.$refs.image.getBoundingClientRect().height
          this.navbarH = this.$refs.navbar.$el.getBoundingClientRect().height
          this.asyncGetPlayListDetail(this.obj.id)
        })
      },
      posY(val,oldVal) {
        this.flag = (this.offsetTop - val) <= this.navbarH
        // 如果新值大于旧值，说明手指在向上滑动，反之则向下滑动
        if(val > oldVal && !this.flag) {
          this.$refs.image.children[0].style.opacity = this.$refs.image.children[1].style.opacity = 0.5
        } else if((val < oldVal) && !this.flag) {
          this.$refs.image.children[0].style.opacity = this.$refs.image.children[1].style.opacity = 1
        }
        this.$refs.image.children[0].style.transition = this.$refs.image.children[1].style.opacity = `opacity 1s`
      },
      getSongObj(val,oldVal) {
        this.$nextTick(() => {
          this.$refs.contain.style.height = this.getHeight((this.songs.length + 1))
        })
      }
    },
    mounted() {
    
    }
  }
</script>

<style lang="stylus" scoped>
  .play-list-songs {
    width: 100vw;
    height: 100vh;
    background-color #ffffff
    position fixed
    top 0
    .nav-bar {
      background-color transparent
      color #ffffff
      position absolute
      top 0
      z-index 4
      .icon-sousuo {
        font-size 23px
      }
    }
    .songs-scroll {
      height: 100vh;
      .image {
        height: 250px;
        position relative
        .flex {
          box-sizing border-box
          padding 50px 15px 0
          display flex
          align-items center
          justify-content space-between
          .background-img {
            flex 40%
            height: 150px;
            box-sizing border-box
            border-radius 5px
            padding 10px 0 15px
            overflow hidden
            img {
              border-radius 5px
              height: 100%;
            }
          }
          .describe {
            flex 50%
            height: 150px;
            box-sizing border-box
            padding 10px 0px
            display flex
            flex-direction column
            justify-content space-between
            color #ececec
            .name {
              height: 50px;
              width: 100%;
              text-overflow: ellipsis;
              overflow: hidden;
              -webkit-line-clamp: 2;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              font-size 18px
              color #ffffff
            }
            .author {
              font-size 16px
              height: 40px;
              display flex
              align-items center
              text-overflow: ellipsis;
              overflow: hidden;
              white-space nowrap
              img {
                width: 25px;
                height: 25px;
                border-radius 50%
                overflow hidden
                vertical-align middle
              }
              span {
                padding-left 10px
              }
            }
            .description {
              height: 40px;
              font-size 14px
              text-overflow: ellipsis;
              overflow: hidden;
              -webkit-line-clamp: 2;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              
            }
          }
        }
        .operation {
          height: calc(100% - 200px);
          box-sizing border-box
          padding 0 15px
          display flex
          align-items center
          color #ffffff
          .operation-item {
            flex 1
            display flex
            flex-direction column
            justify-content center
            align-items center
            .iconfont {
              font-size 23px
            }
          }
        }
        .coverimg {
          width: 100%;
          position absolute
          bottom -30px
          z-index -2
          transform scale(1.4)
          filter blur(23px)
        }
      }
      .contain {
        border-top-left-radius 25px
        border-top-right-radius 25px
        background-color #fff
        height: 1000px;
        .contain-top {
          height 50px
          background-color #fff
          display flex
          justify-content space-between
          align-items center
          box-sizing border-box
          padding 0 10px
          border-top-left-radius: 25px;
          border-top-right-radius: 25px;
          .playAll {
            flex 1
            height: 100%;
            font-size 18px
            color black
            font-weight 600
            display flex
            align-items center
            .iconfont {
              font-size 23px
              vertical-align middle
              font-weight 500
              padding-right 3px
            }
            .track-count {
              font-size 14px
              font-weight 500
              color #cccccc
            }
          }
          .selected-more {
            flex 1
            height: 100%;
            display flex
            flex-direction column
            justify-content center
            align-items flex-end
            text-align right
            font-size 15px
            .collection {
              padding 7px
              border-radius 20px
              background-color #ff4b4b
              color #ffffff
            }
          }
        }
        .number {
          display flex
          width: 100%;
          height: 100%;
          align-items center
          justify-content center
          font-size 20px
        }
      }
    }
  }
  .van-loading {
    margin-top 30px
    display flex
    justify-content center
  }
  .position {
    width: 100vw;
    height: 100px;
    position absolute
    overflow hidden
    top 0
    z-index 3
    .coverimg {
      width: 100%;
      position absolute
      bottom 0px
      z-index -2
      transform scale(1.4)
      filter blur(23px)
    }
    .contain-top {
      position absolute
      bottom 0
      height 50px
      width: 100vw;
      background-color #fff
      display flex
      justify-content space-between
      align-items center
      box-sizing border-box
      padding 0 10px
      border-top-left-radius: 25px;
      border-top-right-radius: 25px;
      .playAll {
        flex 1
        height: 100%;
        font-size 18px
        color black
        font-weight 600
        display flex
        align-items center
        .iconfont {
          font-size 23px
          vertical-align middle
          font-weight 500
          padding-right 3px
        }
        .track-count {
          font-size 14px
          font-weight 500
          color #cccccc
        }
      }
      .selected-more {
        flex 1
        height: 100%;
        display flex
        flex-direction column
        justify-content center
        align-items flex-end
        text-align right
        font-size 15px
        .collection {
          padding 7px
          border-radius 20px
          background-color #ff4b4b
          color #ffffff
        }
      }
    }
  }
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translate(0,60px);
  }
  .list-enter-active, .list-leave-active {
    transition: all .3s;
  }
</style>