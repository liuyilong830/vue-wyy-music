<template>
  <div class="all-search-result">
    <compre-hensive v-if="index == 0" v-bind="$attrs"></compre-hensive>
    <single v-if="index == 1"></single>
    <cloud-village v-if="index == 2"></cloud-village>
    <video-search v-if="index == 3"></video-search>
  </div>
</template>

<script>
  import CompreHensive from './child/CompreHensive'
  import Single from './child/Single'
  import CloudVillage from './child/CloudVillage'
  import VideoSearch from './child/VideoSearch'
  export default {
    name: 'AllSearchResult',
    components: {VideoSearch, CloudVillage, Single, CompreHensive},
    data() {
      return {
        CompreHensive,
        Single,
        CloudVillage,
        VideoSearch
      }
    },
    props: {
      index: {
        type: Number,
        default: 0
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .all-search-result {
    width: 100%;
    height: 100%;
  }
</style>