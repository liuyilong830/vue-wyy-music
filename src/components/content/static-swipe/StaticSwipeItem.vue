<template>
  <div class="static-swiper-item">
    <span>{{item}}</span>
  </div>
</template>

<script>
  export default {
    name: 'StaticSwipeItem',
    props: {
      item: {
        type: Number,
        default: 0
      }
    }
  }
</script>

<style scoped>
  .static-swiper-item {
    width: 310px;
    height: 50px;
    margin-right: 15px;
    margin-bottom: 15px;
    background-color: lightcoral;
  }
  .static-swiper-item:last-child {
    margin-right: 0;
  }
</style>