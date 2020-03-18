<template>
  <div class="labels">
    <div class="label-title">
      <div class="title">
        <slot name="title"><span>标签</span></slot>
      </div>
      <div class="btn">
        <slot name="btn"><span></span></slot>
      </div>
    </div>
    <div class="label-list">
      <slot name="label-item">
        <div class="label-item">
          <div class="border">
            <span>子标签</span>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Labels',
    components: {},
    data() {
      return {}
    },
  }
</script>

<style lang="stylus" scoped>
  .labels {
    width: 100vw;
    box-sizing border-box
    padding 0 15px
    .label-title {
      height: 40px;
      display flex
      justify-content space-between
      align-items center
      margin-bottom 10px
      .title, .btn {
        flex 1
      }
      .btn {
        text-align right
      }
    }
    .label-list {
      display flex
      flex-wrap wrap
    }
  }
</style>