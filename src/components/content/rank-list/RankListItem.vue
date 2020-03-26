<template>
  <div class="rank-list-item" ref="rankListItem">
    <div class="mask">
      <div class="rank-list-item-title">
        <h2 @click.stop="openToPlayList">{{item.name}} ></h2>
      </div>
      <ul class="content">
        <li class="public" v-for="(item,index) in showRank3" :key="index" @click="playsong(item)">
          <div class="songImg">
            <img :src="item.al.picUrl" alt="">
          </div>
          <div class="number">{{index+1}}</div>
          <div class="song">
            <span class="song-name">{{item.name}}</span>
            <span> -{{getAuthorName(item.ar)}}</span>
          </div>
          <div class="songStatic">
            <span
              class="iconfont"
              :class="{'icon-hengxian1': item.no == 1, 'icon-sjt-s':item.no == 2, 'icon-sjt-s-copy':item.no == 3}"
              v-show="!play(item)"
            >
              {{getStatic(item)}}
            </span>
            <span class="iconfont icon-youshenglaba" v-show="play(item)"></span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: 'RankListItem',
    props: {
      item: {
        type: Object,
        default() {
          return {}
        }
      },
      index: {
        type: Number,
        default: 0
      }
    },
    computed: {
      showRank3() {
        var arr = []
        for(var i = 0; i < 3; i++) {
          arr.push(this.item.tracks[i])
        }
        return arr
      },
      ...mapGetters(['getSongObj'])
    },
    methods: {
      getStatic(item) {
        if(item.no !== 1 && item.no !== 2 && item.no !== 3) {
          return '新'
        } else {
          return ''
        }
      },
      openToPlayList() {
        this.$emit('openToPlayList', this.item)
      },
      getAuthorName(arr) {
        return arr.map(item => item.name).join(' / ')
      },
      playsong(item) {
        this.$emit('playsong', {obj: item, index: this.index})
      },
      play(item) {
        return this.getSongObj.id === item.id
      }
    },
    mounted() {
      this.$refs.rankListItem.style.backgroundImage = `url(${this.item.tracks[0].al.picUrl})`
    }
  }
</script>

<style lang="stylus" scoped>
  .rank-list-item {
    width 310px
    height 175px
    border-radius: 6px;
    margin-right: 15px;
    float left
    background-size cover
    position relative
    background-position 0 -80px
  }
  .mask {
    background: linear-gradient(to top, rgba(0,0,0,1), rgba(128, 123, 123, 0.75));
    // background-color rgba(0,0,0,.5)
    border-radius: 6px;
    box-sizing border-box
    padding 0 10px 
    width 100%
    height 100%
  }
  .content {
    display flex
    flex-direction column
    justify-content space-evenly
    height 140px
  }
  .public {
    height 40px
  }
  .rank-list-item-title {
    height 35px
    font-size 18px
    color #fff
    display flex
    align-items center
  }
  .public {
    display flex
    align-items center
  }
  .songImg {
    width 35px
    height 35px
    border-radius 6px
    overflow hidden
    background-color #fff
  }
  .songImg img {
    width 100%
  }
  .number {
    width 20px
    height 100%
    display flex
    align-items center
    justify-content center
    color #ffffff
    font-weight 500
    font-size 20px
    margin 0 5px
  }
  .song {
    width calc(100% - 35px - 30px - 25px)
    height 100%
    display flex
    align-items center
  }
  .song-name {
    
  }
  .song span:first-child {
    max-width 70%
    font-size 18px
    color #ffffff
    white-space nowrap
    text-overflow ellipsis
    overflow hidden
    margin-right 10px
  }
  .song span:last-child {
    color #cccccc
    font-size 13px
    white-space nowrap
    text-overflow ellipsis
    overflow hidden
  }
  .songStatic {
    width 20px
    height 100%
    margin-left 5px
    display flex
    align-items center
    justify-content center
    .icon-youshenglaba {
      font-size 24px
      color #ff6a00
    }
  }
  .songStatic span {
    color #ffffff
    font-size 15px
    font-weight 600
  }
  .songStatic .icon-hengxian1 {
    color #b9b7b7
  }
  .songStatic .icon-sjt-s {
    color #f55959
  }
  .songStatic .icon-sjt-s-copy {
    color #3aff3a
  }
</style>