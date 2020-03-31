<template>
  <ul class="compre-theme">
    <li class="theme-item" v-for="(item,index) in list" :key="index">
      <div class="image">
        <img :src="item.showCover.url" alt="">
      </div>
      <div class="info">
        <div class="title">
          <p># {{item.talkName}}</p>
        </div>
        <div class="describe">
          <span class="aaa">{{item.follows}}人关注</span>
          <span>{{item.participations}}人参与</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'CompreTheme',
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
  .compre-theme {
    width: 100%;
    .theme-item {
      display flex
      align-items center
      justify-content space-between
      height: 70px;
      box-sizing border-box
      padding-bottom 10px
      .image {
        height: 100%;
        width: 60px;
        border-radius 4px
        overflow hidden
        img {
          height: 100%;
        }
      }
      .info {
        height: 100%;
        width: calc(100% - 70px);
        box-sizing border-box
        display flex
        flex-direction column
        justify-content space-around
        .title {
          display flex
          font-size 16px
          color black
          text-overflow: ellipsis;
          overflow: hidden;
          -webkit-line-clamp: 2;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }
        .describe {
          font-size 12px
          color #9a9a9a
          text-overflow: ellipsis;
          overflow: hidden;
          -webkit-line-clamp: 2;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          .aaa {
            padding-right 10px
          }
        }
      }
    }
  }
</style>