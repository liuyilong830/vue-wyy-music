<template>
    <div class="music-comment">
      <nav-bar @confirmBack='confirmBack' class="nav-bar" ref="navbar">
        <template v-slot:left>
          <span class="iconfont icon-arrow-prev"></span>
        </template>
        <template v-slot:center>
          <span class="title">评论({{commentsObj.total}})</span>
        </template>
        <template v-slot:right>
          <span class="iconfont icon-fenxiang1"></span>
        </template>
      </nav-bar>
      <div class="wraper">
        <div class="song">
          <div class="left">
            <img :src="getImgUrl" alt="">
          </div>
          <div class="center">
            <span class="song-name">{{songObj.name}}</span>
            <a href="">{{getArtists}}</a>
          </div>
          <div class="right">&gt;</div>
        </div>
        <!-- 热门评论 -->
        <div class="hot-comments">
          <h2 class="title">精彩评论</h2>
          <div class="comment-list">
            <comment-comp v-for="(item,index) in hotComments" :key="index">
              <template v-slot:img>
                <img :src="item.user.avatarUrl" alt="">
              </template>
              <template v-slot:info>
                <span>{{item.user.nickname}}</span>
              </template>
              <template v-slot:time>
                <span>{{item.time | filterTime}}</span>
              </template>
              <template v-slot:count-icon>
                <span class="count">{{item.likedCount}}</span>
                <span class="iconfont icon-zan"></span>
              </template>
              <template v-slot:content>
                <p class="text" v-html="item.content"></p>
              </template>
              <template v-slot:btn v-if="index === hotComments.length-1">
                <div class="btn-div">
                  <span class="btn">全部精彩评论 ></span>
                </div>
              </template>
            </comment-comp>
          </div>
        </div>
        <!-- 最新评论 -->
      </div>
    </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CommentComp from 'components/common/comment/CommentComp'
  import {mapGetters} from 'vuex'
  export default {
    name: 'Comment',
    components: {
      NavBar,
      CommentComp
    },
    data() {
      return {
        songObj: {},
        hotComments: [],
        comments: []
      }
    },
    model: {
      prop: 'val1',
      event: 'click'
    },
    props: {
      commentsObj: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    filters: {
      filterTime(value) {
        let t = new Date()
        let time = new Date(value)
        let year = time.getFullYear()
        let month = time.getMonth() + 1
        let day = time.getDate()
        let hour = time.getHours()
        let minute = time.getMinutes()
        if(t.getFullYear() !== year) {
          // 小于当前年份
          return `${year}年${month}月${day}日`
        } else if((t.getTime() - time.getTime()) >= 2*24*60*60*1000) {
          // 大于2天，但是在本年份内
          return `${month}月${day}日`
        } else if((t.getTime() - time.getTime()) >= 24*60*60*1000) {
          // 大于等于1天，但小于两天
          return `昨天${hour}:${minute}`
        } else if((t.getTime() - time.getTime()) >= 60*60*1000) {
          // 大于等于1小时，但小于1天，显示：00:00
          return `${hour}:${minute}`
        } else if((t.getTime() - time.getTime()) >= 60000) {
          // 大于等于1分钟，但小于1小时
          return `${parseInt(((t.getTime() - time.getTime())/1000)/60)}分钟前`
        } else {
          // 在1分钟之内
          return `${parseInt((t.getTime() - time.getTime())/1000)}秒前`
        }
      },
      
    },
    computed: {
      ...mapGetters(['getShowSong']),
      // 获取背景图片
      getImgUrl() {
        if(this.songObj.album) {
          return this.songObj.album.blurPicUrl
        } else if(this.songObj.al) {
          return this.songObj.al.picUrl
        } else {
          return ''
        }
      },
      // 获取作者和歌曲的展示信息
      getArtists() {
        if(this.songObj.artists) {
          return this.songObj.artists[0].name
        } else if(this.songObj.ar) {
          return this.songObj.ar[0].name
        }
      }
    },
    methods: {
      confirmBack() {
        this.$emit('click', !this.$attrs.val1)
      }
    },
    mounted() {
      this.songObj = this.getShowSong[0]
      this.hotComments = this.commentsObj.hotComments
      this.comments = this.commentsObj.comments
    }
  }
</script>

<style lang="stylus" scoped>
  .music-comment {
    background-color #ffffff
    width: 100vw;
    height: 100vh;
    position fixed
    top 0
    z-index 1
    .nav-bar {
      .icon-fenxiang1 {
        font-size 33px
      }
    }
    .wraper {
      height: calc(100vh - 50px);
      overflow-y auto
      overflow-x hidden
      .song {
        box-sizing border-box
        height: 73px;
        padding 5px 15px
        border-bottom 3px solid #f5f5f5
        display flex
        align-items center
        .left {
          width: 60px;
          height: 100%;
          margin-right 10px
          img {
            height: 100%;
            border-radius 5px
          }
        }
        .center {
          width: calc(100% - 80px);
          height: 100%;
          display flex
          flex-direction column
          justify-content space-around
          .song-name {
            color #666
            font-size 16px
          }
          a {
            color #2fc1f1
          }
        }
        .right {
          width: 10px;
          height: 100%;
          display flex
          align-items center
          justify-content center
        }
      }
      .hot-comments {
        box-sizing border-box
        padding 0 15px
        .title {
          height: 30px;
          line-height 30px
          color #424242
          font-weight 600
        }
        .comment-list {
          .count {
            font-size 15px
            padding-right 5px
          }
          .text {
            text-align justify
            white-space pre-line
          }
          .btn-div {
            width: 100%;
            height: 40px;
            display flex
            justify-content center
            .btn {
              height: 20px;
              padding 5px 10px
              border 1px solid #d0cfcf
              border-radius 15px
            }
          }
        }
      }
    }
  }
  
</style>