<template>
  <div class="swiper-list" ref="swiper_item">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'SwiperList',
    mounted() {
      this.$refs.swiper_item.style.transform = 'translateX(0)'
    }
  }
</script>

<style scoped>
  .swiper-list {
    float: left;
  }
  .swiper-list img{
    width: 100vw;
  }
</style>