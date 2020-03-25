<template>
  <div class="volume-progress-bar">
    <div class="volume_all" @click="jumpClick" ref="volume_all">
      <div class="volume_current" ref="current">
        <div class="volume_dot" @touchstart.prevent='touchStart' @touchmove.prevent='touchMove'></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'VolumeProgressBar',
    data() {
      return {
        volumeAll: 0,
        current: 0,
        start: 0,
        end: 0,
        volume: 0
      }
    },
    computed: {
      ...mapGetters(['getSongFlag'])
    },
    methods: {
      jumpClick(event) {
        this.current = event.pageX - this.$refs.volume_all.getBoundingClientRect().left
        this.$refs.current.style.width = `${this.current}px`
        this.volume = this.current/this.volumeAll
        this.$bus.$emit('changeVolume', this.volume)
      },
      touchStart(event) {
        this.start = this.$refs.volume_all.getBoundingClientRect().x
      },
      touchMove(event) {
        this.end = event.touches[0].pageX || event.touches[0].clientX
        if((this.end - this.start) >= this.volumeAll || (this.end - this.start) <= 0) return
        this.current = this.end - this.start
        this.volume = this.current/this.volumeAll
        this.$refs.current.style.width = `${this.current}px`
        this.$bus.$emit('changeVolume', this.volume)
      }
    },
    mounted() {
      if(this.getSongFlag.current !== 0) {
        this.current = this.getSongFlag.current
        this.$refs.current.style.width = `${this.current}px`
      }
      this.volumeAll = this.$refs.volume_all.getBoundingClientRect().width
      
    },
    beforeDestroy() {
      this.$store.commit('setSongFlag',{current: this.current})
    }
  }
</script>

<style lang="stylus" scoped>
  .volume-progress-bar {
    width 85vw
    height 10px
    margin 0 auto
    display flex
    align-items center
    margin-bottom 10px
  }
  .volume_all {
    width 70%
    margin 0 auto
    height 2px
    background-color rgba(144,144,144,.7)
  }
  .volume_current {
    width 100%
    height 2px
    background-color #ffffff
    position relative
  }
  .volume_dot {
    position absolute
    width 10px
    height 10px
    border-radius 50%
    background-color #fff
    top 50%
    right -1px
    transform translateY(-50%)
  }
</style>