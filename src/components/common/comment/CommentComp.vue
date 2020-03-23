<template>
  <div class="comment-comp">
    <div class="top">
      <div class="img-url">
        <slot name="img">
          <img src="" alt="">
        </slot>
      </div>
      <div class="nickname">
        <div class="person-info">
          <slot name="info">
            <span>刘逸龙</span>
          </slot>
        </div>
        <span class="time">
          <slot name="time">
            2月27日
          </slot>
        </span>
      </div>
      <div class="fabulous">
        <slot name="count-icon">
          <span class="count">10.5万</span>
          <span class="iconfont icon-zan"></span>
        </slot>
      </div>
    </div>
    <div class="content">
      <slot name="content">
        我不是病毒
      </slot>
    </div>
    <slot name="btn"></slot>
  </div>
</template>

<script>
  export default {
    name: 'CommentComp',
    components: {},
    data() {
      return {}
    },
  }
</script>

<style lang="stylus" scoped>
  .comment-comp {
    display flex
    flex-direction column
    justify-content flex-start
    align-items center
    border-bottom 1px solid #f5f5f5
    .top {
      width: 100%;
      display flex
      height: 40px;
      align-items center
      .img-url {
        width: 40px;
        height: 100%;
        margin-right 10px
        overflow hidden
        display flex
        align-items center
        justify-content center
        img {
          width: 80%;
          border-radius 50%
        }
      }
      .nickname {
        width: calc(100% - 60px - 50px);
        height: 100%;
        display flex
        justify-content center
        flex-direction column
        .person-info {
          font-size 14px
        }
        .time {
          color #cccccc
          font-size 12px
        }
      }
      .fabulous {
        width: 60px;
        display flex
        justify-content flex-end
        align-items center
      }
    }
    .content {
      width: 100%;
      box-sizing border-box
      padding 10px 10px 10px 50px
      font-size 15px
      color #383838
    }
  }
</style>