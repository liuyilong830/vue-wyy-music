<template>
  <transition name="search">
    <div class="search">
      <transition name="pos">
        <ul class="position" v-show="showSuggest">
          <li class="pos-item" v-for="(item,index) in suggest" :key="index">
            <p class="iconfont icon-sousuo"></p>
            <p class="text">{{item.keyword}}</p>
          </li>
        </ul>
      </transition>
      <nav-bar @confirmBack='confirmBack' class="nav-bar">
        <template v-slot:left>
          <span class="iconfont icon-arrow-prev"></span>
        </template>
        <template v-slot:center>
          <form action="" class="input" ref="form" @submit.prevent="search">
            <input type="search" ref="search" name="search"autocomplete="off" @focus="onfocus" @blur="onblur" :placeholder="showKeyword" v-model="content">
            <span class="iconfont icon-cha" v-show="content.length !== 0" @click="clearContent"></span>
          </form>
        </template>
        <template v-slot:right>
          <span class="iconfont icon-ren"></span>
        </template>
      </nav-bar>
      <div class="wrapper-search" @scroll="onscroll" v-if="!showResult">
        <div class="content" ref="content">
          <history :history="history" v-if="history.length !== 0" @clearHistory="clearHistory"></history>
          <hot-search :list="searchList"></hot-search>
        </div>
      </div>
      <result-search v-else :result="result" :keywords="content"></result-search>
    
      <clear-history v-model="clear" @clearClick="clearClick"></clear-history>
    </div>
  </transition>
  
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import HotSearch from './child/HotSearch'
  import History from './child/History'
  import ClearHistory from './child/ClearHistory'
  import ResultSearch from './child/ResultSearch'
  import {hotSearch,defSearch,getSuggest,getSearch} from 'api/api.js'
  import { mapGetters } from 'vuex'
  export default {
    name: 'Search',
    components: {
      NavBar,
      HotSearch,
      History,
      ClearHistory,
      ResultSearch
    },
    data() {
      return {
        content: '',
        searchList: [], // 热搜榜
        history: [], // 历史记录
        clear: false,
        showKeyword: '请输入要搜索的内容',
        suggest: [],
        showSuggest: false, // 控制搜索建议的显示和隐藏
        showResult: false,
        result: {}
      }
    },
    model: {
      prop: 'val1',
      event: 'click'
    },
    computed: {
      ...mapGetters(['getSongObj']),
      getShowSuggest() {
      
      }
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
        this.showResult = true
        this.$refs.search.blur()
        this.asyncGetResult(this.content)
      },
      // 失去焦点的时候将搜索建议隐藏
      onblur() {
        this.showSuggest = false
      },
      // 操作滑动的时候将隐藏搜索建议
      onscroll() {
        this.showSuggest = false
      },
      // 当聚集焦点的时候触发
      onfocus() {
        if(this.content.length !== 0) {
          this.showSuggest = true
        }
      },
      // 清空内容
      clearContent() {
        this.content = ''
      },
      // 打开是否清除的提示框
      clearHistory() {
        this.clear = true
        this.showSuggest = false
      },
      // 点击了提示框中的确认按钮
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
      },
      // 获取用户默认的搜索关键字
      asyncDefSearch() {
        defSearch().then(res => {
          if(res.code === 200) this.showKeyword = res.data.showKeyword
        })
      },
      // 获取用户搜索的建议
      asyncSuggest(keywords) {
        getSuggest(keywords).then(res => {
          if(res.code == 200) {
            this.suggest = res.result.allMatch
          }
        })
      },
      // 获取搜索之后的结果
      asyncGetResult(keywords) {
        getSearch(keywords).then(res => {
          if(res.code === 200) {
            this.result = res.result
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
      this.asyncDefSearch()
      if(Object.keys(this.getSongObj).length !== 0) {
        this.$refs.content.style.paddingBottom = 45 + 'px'
      }
    },
    watch: {
      getSongObj() {
        this.$refs.content.style.paddingBottom = 45 + 'px'
      },
      content(val,oldVal) {
        if(val.length !== 0) {
          this.showSuggest = true
          this.asyncSuggest(val)
        } else {
          this.suggest = []
        }
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
    .position {
        position fixed
        left 10px
        top 55px
        z-index: 2;
        width: calc(100vw - 10vw - 20px);
        background-color #ffffff
        box-shadow 2px 3px 6px #cccccc
        .pos-item {
          height: 45px;
          border-bottom 1px solid #d2d2d2bf
          display flex
          .iconfont {
            flex 15%
            font-size 18px
            display flex
            align-items center
            justify-content center
          }
          .text {
            flex 85%
            color #908d8d
            font-size 15px
            display flex
            align-items center
          }
        }
      }
    .nav-bar {
      .input {
        width: 95%;
        display flex
        margin 0 auto
        position relative
        input {
          width: 100%;
          height: 40px;
          border-bottom 1px solid #b9b7b7
          font-size 16px
          box-sizing border-box
          padding-right 30px
        }
        input[type="search"]::-webkit-search-cancel-button{
          display: none;
        }
        .icon-cha {
          position absolute
          right 7px
          top 50%
          transform translateY(-50%)
          font-size 17px
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
  .pos-enter, .pos-leave-to {
    opacity: 0;
  }
  .pos-enter-active, .pos-leave-active {
    transition: all .2s;
  }
</style>