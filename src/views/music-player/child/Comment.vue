<template>
    <div class="music-comment">
      <nav-bar @confirmBack='confirmBack' class="nav-bar" ref="navbar">
        <template v-slot:left>
          <span class="iconfont icon-arrow-prev"></span>
        </template>
        <template v-slot:center>
          <span class="title">{{allCommentCount}}</span>
        </template>
        <template v-slot:right>
          <span class="iconfont icon-fenxiang1"></span>
        </template>
      </nav-bar>
      <div class="wraper" ref="wraper" @scroll="handleScroll">
        <div>
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
          <div class="hot-comments" v-if="hotComments.length !== 0">
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
                  <span class="count">{{item.likedCount | playCountFilter}}</span>
                  <span class="iconfont icon-zan" :class="{private: item.liked}" @click="zanClick(item)"></span>
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
          <div class="news-comments" v-if="showComments.length !== 0">
            <h2 class="title">最新评论</h2>
            <div class="comment-list">
              <comment-comp v-for="(item,index) in showComments" :key="index">
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
                  <span class="count">{{item.likedCount | playCountFilter}}</span>
                  <span class="iconfont icon-zan" :class="{private: item.liked}" @click="zanClick(item)"></span>
                </template>
                <template v-slot:content>
                  <p class="text" v-html="item.content"></p>
                </template>
              </comment-comp>
            </div>
          </div>
          <!-- 加载图案 -->
          <van-loading type="spinner" size="20" color="red" v-show="load"/>
        </div>
      </div>
    </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CommentComp from 'components/common/comment/CommentComp'
  import {mapGetters} from 'vuex'
  import {getComment,getHotComment,setFabulous} from 'api/api.js'
  import {Loading, Toast} from "vant";
  export default {
    name: 'Comment',
    components: {
      NavBar,
      CommentComp,
      VanLoading: Loading,
    },
    data() {
      return {
        songObj: {},
        commentsObj: {},
        hotComments: [],
        comments: [],
        showComments: [],
        scrollY: 0,
        wraperH: 0,
        contentH: 0,
        hotCount: 20,
        count: 50,
        hotOffset: 0,
        offset: 0,
        type: 0,
        load: false
      }
    },
    model: {
      prop: 'val1',
      event: 'click'
    },
    props: {
      songId: {
        type: Number,
        default: 0
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
        function format(num) {
          if(num < 10) {
            return '0'+num
          }
          return num
        }
        if(t.getFullYear() !== year) {
          // 小于当前年份
          return `${year}年${month}月${day}日`
        } else if(t.getMonth()+1 !== month || (t.getMonth()+1 == month && t.getDate()-day >= 2)) {
          // 同一年但是不同月,或者同年同月但是日份大于等于2
          return `${format(month)}月${format(day)}日`
        } else if((t.getDate()-day) >= 1) {
          // 同年同月，且日份在1天到2天之间
          return `昨天${format(hour)}:${format(minute)}`
        } else if((t.getTime() - time.getTime()) >= 60*60*1000) {
          // 大于等于1小时，但小于1天，显示：00:00
          return `${format(hour)}:${format(minute)}`
        } else if((t.getTime() - time.getTime()) >= 60000) {
          // 大于等于1分钟，但小于1小时
          return `${parseInt(((t.getTime() - time.getTime())/1000)/60)}分钟前`
        } else {
          // 在1分钟之内
          return `${parseInt((t.getTime() - time.getTime())/1000)}秒前`
        }
      },
      playCountFilter(value) {
        if(!value) return ''
        let val = value.toString()
        if(val.length > 8) {
          return val.substring(0,val.toString().length - 8) + '亿'
        }
        if(val.length >= 6) {
          return val.substring(0,val.toString().length - 4) + '万'
        }
        return val
      }
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
      },
      // 展示总共的评论数量
      allCommentCount() {
        return this.commentsObj.total? `评论(${this.commentsObj.total})` : '评论'
      }
    },
    methods: {
      confirmBack() {
        this.$emit('click', !this.$attrs.val1)
      },
      // 获取最新评论
      getComment(id, num, offset) {
        getComment(id,num, offset).then(res => {
          if(res.code === 200) {
            this.commentsObj = res
            this.comments.push(...res.comments)
            this.showComments.push(...res.comments.filter(item => item.beReplied.length == 0))
            this.load = false
            this.$nextTick(() => {
              this.wraperH = this.$refs.wraper.getBoundingClientRect().height
              this.contentH = this.$refs.wraper.children[0].getBoundingClientRect().height
            })
          }
        })
      },
      // 获取热评
      getHotComment(id, num, offset, type) {
        getHotComment(id,num,offset,type).then(res => {
          if(res.code === 200) {
            this.hotComments.push(...(res.hotComments.filter((item,index) => index >= this.hotComments.length)))
          }
        })
      },
      handleScroll() {
        this.scrollY = this.$refs.wraper.scrollTop
      },
      // 点击点赞按钮，根据对象中的liked属性来判断是否已经点赞过
      zanClick(item) {
        let show
        item.liked? show = 0 : show = 1
        setFabulous(this.songId, item.commentId, show, 0).then(res => {
          if(res.code == 200) {
            if(show == 1) {
              item.liked = true
              item.likedCount += 1
            } else {
              item.liked = false
              item.likedCount -= 1
            }
          }
        })
        .catch(err => {
          this.$bus.$emit('stopMusic')
          this.$router.replace('/login')
        })
      }
    },
    mounted() {
      this.songObj = this.getShowSong[0]
      /**
       * 下面这两个网络请求是同步的，为的就是需要在热评和新评都获取到之后再获取 wraper的高度等
       */
      this.getHotComment(this.songId, this.hotCount, this.hotOffset, this.type)
      this.getComment(this.songId, this.count, this.offset)
    },
    watch: {
      scrollY(val) {
        if(Math.floor(val) === Math.floor(this.contentH - this.wraperH)) {
          this.load = true
          this.getComment(this.songId, this.count, ++this.offset)
        }
      }
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
      overflow-x hidden
      overflow-y scroll
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
          border-radius 5px
          background-color #cccccc
          img {
            width: 100%;
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
      .hot-comments, .news-comments {
        box-sizing border-box
        padding 0 15px
        .title {
          height: 30px;
          line-height 30px
          color #424242
          font-weight 600
        }
        .comment-list {
          .private {
            color red
          }
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
      .van-loading {
        display flex
        justify-content center
      }
    }
  }
  
</style>