<template>
  <div class="compre-hensive" v-if="showLoad">
    <div ref="compre">
      <div class="compre-songs" v-if="obj.order.find(item => item == 'song')">
        <div class="songs-list-top">
          <h2 class="title">单曲</h2>
          <p class="btn">
            <span class="iconfont icon-bofang3"></span>
            <span>播放全部</span>
          </p>
        </div>
        <ul class="songs-list">
          <songs-list v-for="(item,index) in obj.song.songs" :key="index">
            <template v-slot:songName>
              <span class="name" v-for="(val,i) in format(item.name)" :key="i" :class="{active: val == keywords}">{{val}}</span>
            </template>
            <template v-slot:authorInfo>
              <span v-for="(val,i) in format(item.ar[0].name)" :key="i+val+i" :class="{active: val == keywords}">{{val}}</span>
              <span> - </span>
              <span class="al-name" v-for="(val,i) in format(item.al.name)" :key="i+val" :class="{active: val == keywords}">{{val}}</span>
            </template>
            <template v-slot:icon>
              <span class="iconfont icon-shipin"></span>
              <span class="iconfont icon-gengduo"></span>
            </template>
          </songs-list>
        </ul>
        <div class="look-all" v-if="obj.song.more">
          <span>{{obj.song.moreText}} ></span>
        </div>
      </div>
      <div class="compre-playlist" v-if="obj.order.find(item => item == 'playList')">
        <div class="playlist-list-top">
          <h2 class="title">歌单</h2>
        </div>
        <ul class="songs-sheet-list">
          <song-sheet v-for="(item,index) in obj.playList.playLists" :key="index">
            <template v-slot:image>
              <img :src="item.coverImgUrl" alt="">
            </template>
            <template v-slot:title>
              <span v-for="(item,index) in format(item.name)" :key="index" :class="{active: item == keywords}">{{item}}</span>
            </template>
            <template v-slot:describe>
              <span>{{item.trackCount}}首</span>
              <span> by {{item.creator.nickname}}</span>
              <span>，播放{{item.playCount | filterNumber}}</span>
            </template>
          </song-sheet>
        </ul>
        <div class="look-all" v-if="obj.playList.more">
          <span>{{obj.playList.moreText}} ></span>
        </div>
      </div>
      <div class="compre-mv" v-if="obj.order.find(item => item == 'video')">
        <div class="mv-list-top">
          <h2 class="title">视频</h2>
        </div>
        <ul class="songs-mv-list">
          <songs-video v-for="(item,index) in obj.video.videos" :key="index">
            <template v-slot:image>
              <img :src="item.coverUrl" alt="">
            </template>
            <template v-slot:play-count>
              <span class="iconfont icon-xiangzuosanjiaoxing"></span>
              <span>{{item.playTime | filterNumber}}</span>
            </template>
            <template v-slot:title>
              <span v-for="(item,index) in format(item.title)" :key="index" :class="{active: item == keywords}">{{item}}</span>
            </template>
            <template v-slot:describe>
              <span>{{item.durationms | getPlayTime}}</span>
              <span> by {{item.creator[0].userName}}</span>
            </template>
          </songs-video>
        </ul>
        <div class="look-all" v-if="obj.video.more">
          <span>{{obj.video.moreText}} ></span>
        </div>
      </div>
      <div class="related-search" v-if="obj.order.find(item => item == 'sim_query')">
        <div class="related-list-top">
          <h2 class="title">相关搜索</h2>
        </div>
        <ul class="related-list">
          <related-search v-for="(item,index) in obj.sim_query.sim_querys" :key="index">
            <template v-slot:keywords>
              <span>{{item.keyword}}</span>
            </template>
          </related-search>
        </ul>
      </div>
      <div class="compre-mlog" v-if="obj.order.find(item => item == 'mlog')">
        <div class="mlog-list-top">
          <h2 class="title">Mlog</h2>
        </div>
        <compre-mlog :list="obj.mlog.mlogs"></compre-mlog>
        <div class="look-all" v-if="obj.mlog.more">
          <span>{{obj.mlog.moreText}} ></span>
        </div>
      </div>
      <div class="compre-theme" v-if="obj.order.find(item => item == 'talk')">
        <div class="theme-list-top">
          <h2 class="title">主题</h2>
        </div>
        <compre-theme :list="obj.talk.talks"></compre-theme>
        <div class="look-all" v-if="obj.talk.more">
          <span>{{obj.talk.moreText}} ></span>
        </div>
      </div>
    </div>
  </div>
  <van-loading type="spinner" size="20" color="red" v-else></van-loading>
</template>

<script>
  import { Loading } from 'vant'
  import SongsList from 'components/common/songs-list/SongsList'
  import SongSheet from 'components/common/song-sheet/SongSheet'
  import SongsVideo from 'components/common/songs-video/SongsVideo'
  import RelatedSearch from 'components/common/related-search/RelatedSearch'
  import CompreMlog from 'components/common/mlog/CompreMlog'
  import CompreTheme from 'components/common/compre-theme/CompreTheme'
  import { mapGetters } from 'vuex'
  export default {
    name: 'CompreHensive',
    components: {
      VanLoading: Loading,
      SongsList,
      SongSheet,
      SongsVideo,
      RelatedSearch,
      CompreMlog,
      CompreTheme
    },
    data() {
      return {
        obj: {}
      }
    },
    props: {
      result: {
        type: Object,
        defalut() {
          return {}
        }
      },
      keywords: {
        type: String,
        default: ''
      }
    },
    filters: {
      filterNumber(value) {
        if(!value && value !== 0) return ''
        let val = value.toString()
        if(val.length > 8) {
          return val.substring(0,val.toString().length - 8) + '亿'
        }
        if(val.length > 5) {
          return val.substring(0,val.toString().length - 4) + '万'
        }
        return val
      },
      getPlayTime(value) {
        var minutes = parseInt(value / 1000 / 60)
        var seconds = parseInt((value / 1000) % 60)
        if(minutes < 10) {
          minutes = '0'+minutes
        }
        if(seconds < 10) {
          seconds = '0'+seconds
        }
        return `${minutes}:${seconds}`
      }
    },
    computed: {
      showLoad() {
        this.obj = this.result
        return Object.keys(this.result).length !== 0
      },
      ...mapGetters(['getSongObj'])
    },
    methods: {
      format(value) {
        if(!value.includes(this.keywords)) {
          return value
        } else {
          let reg = new RegExp(this.keywords, 'ig')
          value = value.replace(reg, `&-&${this.keywords}&-&`)
          return value.split('&-&').filter(item => item.length !== 0)
        }
      }
    },
    watch: {
      getSongObj() {
        this.$refs.compre.style.paddingBottom = 45 + 'px'
      },
    },
    updated() {
      if(this.showLoad) {
        if(Object.keys(this.getSongObj).length !== 0) {
          this.$refs.compre.style.paddingBottom = 45 + 'px'
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .compre-hensive {
    width: 100%;
    height: 100%;
    overflow-y auto
    overflow-x hidden
    .compre-songs {
      .songs-list-top {
        height: 40px;
        display flex
        justify-content space-between
        align-items center
        .title {
          font-size 16px
          font-weight 600
          color #666
          flex 1
        }
        .btn {
          font-size 12px
          border 1px solid #cccccc
          border-radius 15px
          padding 2px 10px
          .iconfont {
            font-size 12px
            padding-right 2px
          }
        }
      }
      .songs-list {
        .name {
          color #4c4c4c
        }
        .active {
          color #0892bf
        }
      }
      .look-all {
        height: 30px;
        display flex
        align-items center
        justify-content center
        color #9a9a9a
        margin-bottom 10px
      }
    }
    .compre-playlist {
      .playlist-list-top {
        height: 40px;
        display flex
        justify-content space-between
        align-items center
        .title {
          font-size 16px
          font-weight 600
          color #666
          flex 1
        }
      }
      .look-all {
        height: 30px;
        display flex
        align-items center
        justify-content center
        color #9a9a9a
        margin-bottom 10px
      }
    }
    .compre-mv {
      .mv-list-top {
        height: 40px;
        display flex
        justify-content space-between
        align-items center
        .title {
          font-size 16px
          font-weight 600
          color #666
          flex 1
        }
      }
      .iconfont {
        font-size 14px
      }
      .look-all {
        height: 30px;
        display flex
        align-items center
        justify-content center
        color #9a9a9a
        margin-bottom 10px
      }
    }
    .related-search {
      .related-list-top {
        height: 40px;
        display flex
        justify-content space-between
        align-items center
        .title {
          font-size 16px
          font-weight 600
          color #666
          flex 1
        }
      }
      .related-list {
        display flex
        flex-wrap wrap
        color #666
      }
    }
    .compre-mlog {
      .mlog-list-top {
        height: 40px;
        display flex
        justify-content space-between
        align-items center
        .title {
          font-size 16px
          font-weight 600
          color #666
          flex 1
        }
      }
      .look-all {
        height: 30px;
        display flex
        align-items center
        justify-content center
        color #9a9a9a
        margin-bottom 10px
      }
    }
    .compre-theme {
      .theme-list-top {
        height: 40px;
        display flex
        justify-content space-between
        align-items center
        .title {
          font-size 16px
          font-weight 600
          color #666
          flex 1
        }
      }
      .look-all {
        height: 30px;
        display flex
        align-items center
        justify-content center
        color #9a9a9a
        margin-bottom 10px
      }
    }
  }
  .compre-hensive::-webkit-scrollbar{
    width: 0 !important
    display:none;
  }
  .van-loading {
    margin-top 30px
    display flex
    justify-content center
  }
  .active {
    color #0892bf
  }
</style>