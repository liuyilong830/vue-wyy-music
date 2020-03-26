<template>
  <transition name="clear">
    <div class="clear-history" v-show="$attrs.val1" @click="closeView">
      <div class="alert">
        <p class="text">确定清空全部历史记录？</p>
        <div class="bottom">
          <div class="btn">
            <span @click.stop="closeView">取消</span>
            <span @click="clear">清空</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'ClearHistory',
    components: {},
    data() {
      return {}
    },
    model: {
      prop: 'val1',
      event: 'click'
    },
    methods: {
      closeView() {
        this.$emit('click', !this.$attrs.val1)
      },
      clear() {
        this.$emit('clearClick')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .clear-history {
    width: 100vw;
    height: 100vh;
    background-color rgba(0,0,0,.7)
    position fixed
    top 0
    z-index: 100;
    display flex
    align-items center
    justify-content center
    .alert {
      width: 80%;
      height: 100px;
      background-color #ffffff
      border-radius 6px
      box-sizing border-box
      padding 15px 20px
      position relative
      display flex
      flex-direction column
      justify-content space-between
      .text {
        color #cccccc
        font-size 15px
      }
      .bottom {
        height: 30px;
        display flex
        justify-content flex-end
        .btn {
          color red
          width: 50%;
          height: 30px;
          display flex
          justify-content space-around
          align-items center
        }
      }
    }
  }
  .clear-enter, .clear-leave-to {
    opacity 0
  }
  .clear-enter-active, .clear-leave-active {
    transition all .1s
  }
</style>