<template>
  <div class="hot-search">
    <h2 class="title">热搜榜</h2>
    <ul class="hot-list">
      <li class="list-item" v-for="(item,index) in list" :key="index">
        <div class="number" :class="{active: index <= 2}">
          <span>{{index+1}}</span>
        </div>
        <div class="song-info">
          <div class="song-name">
            <span>{{item.searchWord}}</span>
            <img :src="item.iconUrl" alt="">
          </div>
          <div class="song-describe">
            <span>{{item.content}}</span>
          </div>
        </div>
        <div class="degree-of-heat">
          <span>{{item.score}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'HotSearch',
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
  .hot-search {
    width: 100vw;
    box-sizing border-box
    padding 0 15px
    .title {
      height: 40px;
      font-size 16px
      line-height 40px
      font-weight 600
      color #666
    }
    .hot-list {
      .list-item {
        padding 5px 0
        box-sizing border-box
        height: 60px;
        display flex
        align-items center
        .number {
          width: 30px;
          height: 30px;
          border-radius 6px
          display flex
          justify-content center
          align-items center
          font-size 20px
          margin-right 15px
        }
        .active {
          color orangered
        }
        .song-info {
          width: calc(100% - 115px);
          height: 100%;
          display flex
          flex-direction column
          box-sizing border-box
          padding 2px 0
          justify-content space-between
          .song-name {
            width: 90%;
            height: 30px;
            font-size 16px
            font-weight 600
            color #666
            display flex
            align-items center
            img {
              padding-left 5px
              height: 56%;
              vertical-align top
            }
          }
          .song-describe {
            width: 90%;
            font-size 12px
            color #b7b6b6
            text-overflow: ellipsis;
            overflow: hidden;
            -webkit-line-clamp: 1;
            display: -webkit-box;
            -webkit-box-orient: vertical;
          }
        }
        .degree-of-heat {
          padding 2px 0
          color #b7b6b6
          width: 70px;
          height: 100%;
          display flex
          align-items center
          justify-content flex-end
        }
      }
    }
  }
</style>