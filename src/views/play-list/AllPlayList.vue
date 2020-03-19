<template>
  <div class="all-play-list">
    <play-recommend v-if="item.name == '推荐'" v-on="$listeners"></play-recommend>
    <play-electron v-if="item.name == '电子'"></play-electron>
    <play-official v-if="item.name == '官方'"></play-official>
  </div>
</template>

<script>
  import PlayRecommend from './child/play-recommend/PlayRecommend'
  import PlayOfficial from './child/play-official/PlayOfficial'
  import PlayElectron from './child/play-electron/PlayElectron'
  export default {
    name: 'AllPlayList',
    components: {
      PlayRecommend,
      PlayOfficial,
      PlayElectron
    },
    data() {
      return {}
    },
    props: {
      item: {
        type: Object,
        defalut() {
          return {};
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .all-play-list {
  
  }
</style>