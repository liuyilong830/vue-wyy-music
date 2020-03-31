<template>
  <div class="static-swiper-item" ref="item">
    <div class="static-item-img">
      <img v-lazy="getImgUrl" alt="">
    </div>
    <div class="describe">
      <div class="title-and-ar">
        <span class="title">{{getSongName}}</span>
        <span class="ar">- {{getAuthor}}</span>
      </div>
      <div class="describe-name">
        <span>{{getDescribe}}</span>
      </div>
    </div>
    <div class="bofang" v-show="flag">
      <span class="iconfont icon-bofang3" v-show="!play" @click.stop="startOrstopSong"></span>
      <span class="iconfont icon-bofang4" v-show="play" @click.stop="startOrstopSong"></span>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'StaticSwipeItem',
    props: {
      item: {
        type: Object,
        default() {
          return {}
        }
      },
      flag: {  // 是否展示播放按钮
        type: Boolean,
        default: true
      }
    },
    computed: {
      ...mapGetters(['getSongObj','getSongFlag']),
      play() {
        if(this.getSongObj.id == this.item.id) {
          return this.start = this.getSongFlag.btnFlag
        } else {
          return false
        }
      },
      getImgUrl() {
        if(this.item.al) {
          return this.item.al.picUrl
        } else {
          return this.item.picUrl
        }
      },
      getSongName() {
        return this.item.name
      },
      getAuthor() {
        if(this.item.ar) {
          return this.item.ar[0].name
        } else if(this.item.artists) {
          return this.item.artists[0].name
        } else {
          return this.item.song.artists[0].name
        }
      },
      getDescribe() {
        if(this.item.al) {
          return this.item.al.name
        } else if(this.item.alias) {
          return this.item.alias || this.item.name
        } else {
          return this.item.song.album.name
        }
      }
    },
    data() {
      return {
        start: false
      }
    },
    methods: {
      startOrstopSong() {
        // 使用事件总线来控制player组件的播放和暂停
        this.$bus.$emit('startOrstopSong')
        this.start = !this.start
        this.$store.commit('setSongFlag',{btnFlag: this.start})
      },
    }
  }
</script>

<style scoped>
  .static-swiper-item {
    width: 310px;
    height: 60px;
    border-radius: 6px;
    margin-right: 15px;
    margin-bottom: 15px;
    float: left;
    display: flex;
    align-items: center;
  }
  .static-swiper-item:last-child {
    margin-right: 0;
  }
  .static-item-img {
    width: 60px;
    height: 60px;
    border-radius: 6px;
    overflow: hidden;
    margin-right: 7px;
  }
  .static-item-img img {
    width: 100%;
  }
  .describe {
    width: calc(100% - 107px);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .title-and-ar {
    width: 100%;
    display: flex;
    align-items: center;
    /* white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden; */
  }
  .describe .title {
    /* max-width: 60%; */
    font-size: 16px;
    font-weight: 600;
    /* white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden; */
  }
  .title-and-ar .ar {
    font-size: 12px;
    color: #cccccc;
  }
  .describe .describe-name {
    color: #969595;
  }
  .describe span {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .bofang {
    width: 40px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .bofang span {
    font-size: 26px;
  }
</style>