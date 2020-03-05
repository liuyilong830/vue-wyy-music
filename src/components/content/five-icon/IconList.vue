<template>
  <div class="icon-list" v-if="classList.length !== 0">
    <icon v-for="(item,index) in classList" :key="index" @click.native="iconClick(index)">
      <template v-slot:icon>
        <div class="iconfont" :class="item.cls"></div>
      </template>
      <template v-slot:title>
        <span>{{item.title}}</span>
      </template>
    </icon>
  </div>
</template>

<script>
  import Icon from './Icon'
  export default {
    name: 'IconList',
    components: {
      Icon
    },
    props: {
      classList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      iconClick(index) {
        this.$emit('iconClick',index)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .icon-list {
    box-sizing border-box
    padding 0 15px
    width 100vw
    height 60px
    display flex
    align-items center
    margin 10px 0
  }
</style>