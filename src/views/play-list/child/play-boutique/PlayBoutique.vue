<template>
  <div class="play-boutique">
    <play-boutique-scroll :bounce="false" class="play-boutique-scroll" :pullUpLoad="true" @pullingUp="pullingUp" ref="playScroll">
      <div class="change" v-if="list.length !== 0">
        <span class="title">全部</span>
        <p class="change-label">
          <span>筛选</span>
        </p>
      </div>
      <play-list-item :listItem="list" v-if="list.length !== 0"></play-list-item>
      <van-loading type="spinner" v-show="load" size="20px" color="red"></van-loading>
    </play-boutique-scroll>
  </div>
</template>

<script>
  import PlayBoutiqueScroll from "components/common/betterscroll/BScroll";
  import PlayListItem from '../PlayListItem'
  
  import {getPlayList} from 'api/api.js'

  import { Loading } from 'vant';
  export default {
    name: 'PlayBoutique',
    components: {
      PlayBoutiqueScroll,
      PlayListItem,
      VanLoading: Loading
    },
    data() {
      return {
        list: [],
        load: false,
        cat: '全部',
        count: 30,
        obj: {coverImgUrl: ''}
      }
    },
    props: {
      currentIndex: {
        type: Number,
        default: 0
      },
      index: {
        type: Number,
        default: 0
      }
    },
    methods: {
      asyncGetPlayList(num) {
        this.load = true
        getPlayList(num, this.cat).then(res => {
          if(res.code === 200) {
            if(this.list.length == 0) {
              this.obj.coverImgUrl = res.playlists[0].coverImgUrl
              this.$emit('setActiveImg', this.obj.coverImgUrl)
            }
            this.list.push(...res.playlists.filter((item,index) => index >= this.list.length))
            this.$refs.playScroll.finishPullUp()
            this.$refs.playScroll.scroll.refresh()
            this.count = this.list.length
            this.load = false
          }
        })
      },
      pullingUp(scroll) {
        this.asyncGetPlayList(this.count + 30)
      }
    },
    mounted() {
      if(this.currentIndex === this.index && this.list.length == 0) {
        this.asyncGetPlayList(this.count)
      }
    },
    watch: {
      currentIndex(val,oldVal) {
        if(val === this.index && this.list.length == 0) {
          // 调用混入中的方法
          this.asyncGetPlayList(this.count)
        } else if(val === this.index) {
          this.$emit('setActiveImg', this.obj.coverImgUrl)
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .play-boutique {
    width: 100vw;
    height: calc(100vh - 90px);
  }
  .play-boutique-scroll {
    height: 100%;
    .change {
      height: 50px;
      box-sizing border-box
      padding 10px 15px
      display flex
      justify-content space-between
      align-items center
      .title {
        flex 70%
        font-size 16px
        font-weight 600
      }
      .change-label {
        flex 30%
        text-align right
        span {
          padding 1px 7px
          border 1px solid #cccccc
          border-radius 10px
        }
      }
    }
  }
  .van-loading {
    display flex
    justify-content center
  }
</style>