<template>
  <div class="tabbar-item" @click="tabbarClick" :style="isActiveColor" :class="{active: isActive}">
    <slot>我的</slot>
  </div>
</template>

<script>
  export default {
    name: 'TabBarItem',
    props: {
      path: {
        type: String,
        default: ''
      },
      active: {
        type: Object,
        default() {
          return {
            fontWeight: 600,
            color: '#696969'
          }
        }
      }
    },
    computed: {
      isActive() {
        return this.$route.path.includes(this.path)
      },
      isActiveColor() {
        return this.isActive? {color: this.active.color , fontWeight: this.active.fontWeight } : {}
      }
    },
    methods: {
      tabbarClick() {
        this.$router.replace(this.path)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .tabbar-item {
    flex 1
    font-size 16px
    transition all .2s
  }
  .active {
    transform scale(1.1)
  }
</style>