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
    width: 100vw;
    height: calc(100vh - 90px);
    box-sizing border-box
    padding 0 15px
  }
  .play-official-scroll {
    height 100%
  }
</style>