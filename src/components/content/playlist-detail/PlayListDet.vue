<template>
  <div>
    <top-scroll :bounce='false' :probeType='3' class='x-scroll'>
      <div class='recommend-songs'>

        <song-item v-for="(item,index) in recommend" :key="index">
          <template v-slot:count>
            <span>{{item.playcount || item.playCount | playCount}}</span>
          </template>
          <template v-slot:image>
            <img :src="item.picUrl || item.coverImgUrl" alt="">
          </template>
          <template v-slot:describe>
            <span>{{item.copywriter || item.name}}</span>
          </template>
        </song-item>

      </div>
    </top-scroll>
  </div>
</template>

<script>
  import TopScroll from 'components/common/betterscroll/TopScroll.vue'
  import SongItem from 'components/content/song-item/SongItem'
  import More from 'components/content/more/More'
  export default {
    name: 'PlayListDet',
    components: {
      TopScroll,
      SongItem,
      More
    },
    props: {
      recommend: {
        type: Array,
        default() {
          return []
        }
      }
    },
    filters: {
      playCount(value) {
        var value = value.toString()
        if(value.length > 8) {
          return value.substring(0,value.toString().length - 8) + '亿'
        }
        if(value.length >= 5) {
          return value.substring(0,value.toString().length - 4) + '万'
        }
        return value
      }
    },
    computed: {
      
    }
  }
</script>

<style lang="stylus" scoped>
  .x-scroll {
    width 100%
  }
  .recommend-songs {
    width 100%
    display flex
    justify-content space-between
  }
  .recommend-songs .item:last-child {
    margin-right 0
  }
</style>