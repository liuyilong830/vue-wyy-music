<template>
  <div class="play-official">
    <play-official-scroll :bounce="false" class="play-official-scroll">
      这里是官方
    </play-official-scroll>
  </div>
</template>

<script>
  import PlayOfficialScroll from "components/common/betterscroll/BScroll";
  export default {
    name: 'PlayOfficial',
    components: {
      PlayOfficialScroll
    },
    data() {
      return {}
    },
  }
</script>

<style lang="stylus" scoped>
  .play-official {
  
  }
  .play-official-scroll {
    height: calc(100vh - 100px);
  }
</style>