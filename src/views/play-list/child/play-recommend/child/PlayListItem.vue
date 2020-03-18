<template>
  <div class="play-list-item">
    <song-item v-for="(item,index) in listItem" :key="index" class="song-item">
      <template v-slot:count>
        <span>{{item.playcount || item.playCount | playCountFilter}}</span>
      </template>
      <template v-slot:image>
        <img :src="item.picUrl || item.coverImgUrl" alt="">
      </template>
      <template v-slot:describe>
        <span>{{item.copywriter || item.name}}</span>
      </template>
    </song-item>
  </div>
</template>

<script>
  import SongItem from 'components/content/song-item/SongItem'
  export default {
    name: 'PlayListItem',
    components: {
      SongItem
    },
    data() {
      return {}
    },
    props: {
      listItem: {
        type: Array,
        defalut() {
          return []
        }
      }
    },
    filters: {
      playCountFilter(value) {
        if(!value) return ''
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
  }
</script>

<style lang="stylus" scoped>
  .play-list-item {
    width: 100vw;
    box-sizing border-box
    padding 0 15px
    display flex
    flex-wrap wrap
    justify-content space-between
    .song-item {
      margin-bottom 10px
    }
  }
</style>