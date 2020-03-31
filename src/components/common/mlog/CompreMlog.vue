<template>
  <div class="compre-mlog">
    <div class="mlog-list">
      <div class="mlog-item" v-for="(item,index) in list" :key="index">
        <div class="item-top">
          <img
            :src="item.resource.mlogBaseData.coverUrl"
            :class="{square: item.resource.mlogBaseData.coverHeight - item.resource.mlogBaseData.coverWidth <= 50}" alt="">
          <span class="position" v-if="item.matchFieldContent">{{item.matchFieldContent}}</span>
        </div>
        <div class="content">
          <p class="text">{{item.resource.mlogBaseData.text}}</p>
          <p class="bottom">
            <span class="author">
              <img :src="item.resource.userProfile.avatarUrl" alt="">
              <span>{{item.resource.userProfile.nickname}}</span>
            </span>
            <span class="zan">{{item.resource.mlogExtVO.likedCount}}赞</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CompreMlog',
    components: {},
    data() {
      return {}
    },
    props: {
      list: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .compre-mlog {
    width: 100%;
    margin-bottom 10px
    .mlog-list {
      width: 100%;
      display flex
      justify-content space-around
      .mlog-item {
        width: 45%;
        height: 220px;
        border-radius 5px
        background-color #ffffff
        box-shadow 1px 1px 5px #cccccc
        overflow hidden
        position relative
        .item-top {
          width: 100%;
          height: 160px;
          position relative
          img {
            width: 100%;
            transform translateY(-20px)
          }
          .square {
            width: 100%;
            height: 100%;
            transform translateY(0)
          }
          .position {
            position absolute
            padding 2px 8px
            background-color rgba(0,0,0, .7)
            color #ffffff
            border-radius 13px
            font-size 12px
            bottom 5px
            left 5px
            text-overflow: ellipsis;
            white-space nowrap
            overflow hidden
          }
        }
        .content {
          position absolute
          z-index 1
          bottom 0
          width: 100%;
          height: 60px;
          display flex
          flex-direction column
          justify-content space-between
          box-sizing border-box
          padding 2px 2px
          background-color #ffffff
          .text {
            width: 100%;
            height: 32px;
            font-size 12px
            text-overflow ellipsis
            overflow hidden
            -webkit-line-clamp 2
            display -webkit-box
            -webkit-box-orient vertical
          }
          .bottom {
            width: 100%;
            height: 20px;
            display flex
            justify-content space-between
            align-items center
            color #cccccc
            font-size 12px
            .author {
              flex 70%
              display flex
              align-items center
              img {
                height: 15px;
                border-radius 50%
                vertical-align middle
              }
              span {
                padding-left 5px
              }
            }
            .zan {
              flex 30%
              text-align right
            }
          }
        }
      }
    }
  }
</style>