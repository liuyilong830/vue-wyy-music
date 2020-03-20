<template>
  <div class="all-play-list">
      <play-recommend v-if="item.name == '推荐'" v-on="$listeners" v-bind="$attrs"></play-recommend>
      <play-electron v-if="item.name == '电子'" v-on="$listeners" v-bind="$attrs"></play-electron>
      <play-official v-if="item.name == '官方'" v-on="$listeners" v-bind="$attrs"></play-official>
      <play-popular v-if="item.name == '流行'" v-on="$listeners" v-bind="$attrs"></play-popular>
      <play-rap v-if="item.name == '说唱'" v-on="$listeners" v-bind="$attrs"></play-rap>
      <play-chinese v-if="item.name == '华语'" v-on="$listeners" v-bind="$attrs"></play-chinese>
      <play-boutique v-if="item.name == '精品'" v-on="$listeners" v-bind="$attrs"></play-boutique>
      <play-ballad v-if="item.name == '民谣'" v-on="$listeners" v-bind="$attrs"></play-ballad>
  </div>
</template>

<script>
  import PlayRecommend from './child/play-recommend/PlayRecommend'
  import PlayOfficial from './child/play-official/PlayOfficial'
  import PlayElectron from './child/play-electron/PlayElectron'
  import PlayRap from './child/play-rap/PlayRap'
  import PlayBoutique from './child/play-boutique/PlayBoutique'
  import PlayChinese from './child/play-chinese/PlayChinese'
  import PlayPopular from './child/play-popular/PlayPopular'
  import PlayBallad from './child/play-ballad/PlayBallad'
  import Vue from 'vue'
  export default {
    name: 'AllPlayList',
    components: {
      PlayRecommend,
      PlayOfficial,
      PlayElectron,
      PlayBallad,
      PlayBoutique,
      PlayChinese,
      PlayPopular,
      PlayRap
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
    },
  }
</script>

<style lang="stylus" scoped>
  .all-play-list {
    width: 100vw;
    height: calc(100vh - 90px);
  }
</style>