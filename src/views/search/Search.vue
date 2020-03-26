<template>
  <transition name="search">
    <div class="search">
      <nav-bar @confirmBack='confirmBack' class="nav-bar">
        <template v-slot:left>
          <span class="iconfont icon-arrow-prev"></span>
        </template>
        <template v-slot:center>
          <form action="" class="input" ref="form" @submit.prevent="search">
            <input type="search" ref="search" name="search"autocomplete="off" placeholder="请输入您想搜索的内容" v-model="content">
          </form>
        </template>
        <template v-slot:right>
          <span class="iconfont icon-ren"></span>
        </template>
      </nav-bar>
      <div class="wrapper-search">
        <div class="content" ref="content">
          <history :history="history" v-if="history.length !== 0" @clearHistory="clearHistory"></history>
          <hot-search :list="searchList"></hot-search>
        </div>
      </div>
    
      <clear-history v-model="clear" @clearClick="clearClick"></clear-history>
    </div>
  </transition>
  
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import HotSearch from './child/HotSearch'
  import History from './child/History'
  import ClearHistory from './child/ClearHistory'
  import {hotSearch} from 'api/api.js'
  import { mapGetters } from 'vuex'
  export default {
    name: 'Search',
    components: {
      NavBar,
      HotSearch,
      History,
      ClearHistory
    },
    data() {
      return {
        content: '',
        searchList: [], // 热搜榜
        history: [], // 历史记录
        clear: false
      }
    },
    model: {
      prop: 'val1',
      event: 'click'
    },
    computed: {
      ...mapGetters(['getSongObj'])
    },
    methods: {
      confirmBack() {
        this.$router.back()
      },
      // 搜索操作
      search() {
        if(!this.history.find(item => item == this.content)) {
          this.history.unshift(this.content)
          window.localStorage.setItem('history', JSON.stringify(this.history))
        }
        this.$refs.search.blur()
      },
      clearHistory() {
        this.clear = true
      },
      clearClick() {
        this.history = []
        window.localStorage.setItem('history', JSON.stringify(this.history))
      },
      // 获取热搜榜
      asyncHotSeach() {
        hotSearch().then(res => {
          if(res.code === 200) {
            this.searchList = res.data
          }
        })
      }
    },
    created() {
      this.asyncHotSeach()
      if(!window.localStorage.getItem('history')) {
        window.localStorage.setItem('history', JSON.stringify([]))
      }
      this.history = JSON.parse(window.localStorage.getItem('history'))
    },
    mounted() {
      if(Object.keys(this.getSongObj).length !== 0) {
        this.$refs.content.style.paddingBottom = 45 + 'px'
      }
    },
    watch: {
      getSongObj() {
        this.$refs.content.style.paddingBottom = 45 + 'px'
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .search {
    width: 100vw;
    height: 100vh;
    position fixed
    top 0
    z-index 2
    background-color #fff
    .nav-bar {
      .input {
        width: 95%;
        display flex
        margin 0 auto
        input {
          width: 100%;
          height: 40px;
          border-bottom 1px solid #b9b7b7
          font-size 16px
        }
        input[type="search"]::-webkit-search-cancel-button{
          display: none;
        }
      }
      .icon-ren {
        font-size 30px
      }
    }
    .wrapper-search {
      height: calc(100vh - 50px);
      overflow-y auto
      overflow-x hidden
    }
  }
  .search-enter, .search-leave-to {
    transform: translateY(60px);
    opacity: 0;
  }
  .search-enter-active, .search-leave-active {
    transition: all .2s;
  }
</style>