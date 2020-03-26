<template>
  <div class="history">
    <div class="top">
      <h2 class="title">历史记录</h2>
      <span class="iconfont icon-lajitongshanchu" @click="clearHistory"></span>
    </div>
    <div class="wrapper-history">
      <ul class="float" ref="contain">
        <li class="item" v-for="(item,index) in history" :key="index">
          <span>{{item}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'History',
    components: {},
    data() {
      return {
        containWidth: 0,
        marginRight: 0
      }
    },
    props: {
      history: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      getContainWidth() {
        let width = 0
        for(let i = 0; i < this.history.length; i++) {
          width += this.$refs.contain.children[i].getBoundingClientRect().width
        }
        this.containWidth = width + (this.history.length-1) * this.marginRight
        this.$refs.contain.style.width = this.containWidth + 'px'
      },
      clearHistory() {
        this.$emit('clearHistory')
      }
    },
    mounted() {
      if(this.$refs.contain.children[0]) {
        let w = window.getComputedStyle(this.$refs.contain.children[0]).marginRight
        this.marginRight = Number(w.substring(0, w.length-2))
        this.getContainWidth()
      }
    },
    watch: {
      history(val) {
        this.$nextTick(() => {
          if(this.$refs.contain.children[0]) {
            this.$refs.contain.style.width = 10000 + 'px'
            let w = window.getComputedStyle(this.$refs.contain.children[0]).marginRight
            this.marginRight = Number(w.substring(0, w.length-2))
            this.getContainWidth()
          }
        })
        
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .history {
    width: 100%;
    box-sizing border-box
    padding 0 15px
    .top {
      height: 40px;
      display flex
      justify-content space-between
      align-items center
      .title {
        height: 40px;
        line-height 40px
        font-size 16px
        font-weight 600
        color #666
      }
      .iconfont {
        font-size 23px
        color #929292
      }
    }
    .wrapper-history {
      height: 30px;
      overflow-x auto
      overflow-y hidden
    }
    .wrapper-history::-webkit-scrollbar{
      width: 0 !important
      display:none;
    }
    .float {
      height: 30px;
      width: 500px;
      .item {
        height: 100%;
        line-height 30px
        float left
        margin-right: 10px;
        span {
          background-color #cccccc6b
          padding 3px 10px
          border-radius 10px
        }
      }
      
    }
    
  }
  .float .item:last-child {
    margin-right 0
  }
</style>