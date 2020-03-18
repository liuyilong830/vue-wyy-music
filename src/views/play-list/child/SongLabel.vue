<template>
  <transition name="song-label">
    <div class="song-label" v-show="$attrs.val1">
      <nav-bar @confirmBack='confirmBack' class="nav-bar" ref="navbar">
        <template v-slot:left>
          <span class="iconfont icon-arrow-prev"></span>
        </template>
        <template v-slot:center>
          <span class="title">歌单标签</span>
        </template>
      </nav-bar>
      
      <div class="scroll">
        <labels>
          <template v-slot:title>
            <span>我的歌单广场</span>
            <span class="shuoming">&nbsp;&nbsp;(长按可编辑)</span>
          </template>
          <template v-slot:btn>
            <span class="bainji">编辑</span>
          </template>
          <template v-slot:label-item>
            <div class="label-item" v-for="(item,index) in myLables" :key="index">
              <div class="border" @touchstart="touchStart" @touchend="touchEnd">
                <span>{{item}}</span>
              </div>
            </div>
          </template>
        </labels>
        <labels v-for="(item,index) in labels" :key="index">
          <template v-slot:title>
            <span>{{item.name}}</span>
          </template>
          <template v-slot:label-item>
            <div class="label-item" v-for="(value,i) in item.list" :key="i">
              <div class="border" :class="{active: value.name == myLables.find(val => val == value.name)}" @touchstart="touchStart" @touchend="touchEnd">
                <span>{{value.name}}</span>
              </div>
            </div>
          </template>
        </labels>
      </div>
    </div>
  </transition>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Labels from './Labels'
  
  // 网络请求的api
  import {getLabels} from 'api/api.js'
  export default {
    name: 'SongLabel',
    components: {
      NavBar,
      Labels
    },
    data() {
      return {
        myLables: ['推荐','官方','精品','华语','说唱','流行','民谣','电子'],
        labels: [],
        timer: null,
        time: 0,
        flag: false
      }
    },
    model: {
      prop: 'val1',
      event: 'click'
    },
    methods: {
      confirmBack() {
        this.$emit('click', !this.$attrs.val1)
      },
      // 将获取到的分类列表插入到对应的对象中
      setLables(length,data,items) {
        for(let i = 0; i < length; i++) {
          let obj = {}
          obj.name = data[i]
          obj.list = items.filter(item => item.category === i)
          this.labels.push(obj)
        }
      },
      touchStart() {
        this.time = 0
        this.timer = setInterval(() => {
          this.time ++
        }, 1000)
      },
      touchEnd() {
        clearInterval(this.timer)
        if(this.time > 1) this.flag = true
      }
    },
    mounted() {
      getLabels().then(res => {
        if(res.code === 200) {
          this.setLables(Object.keys(res.categories).length, res.categories,res.sub)
        }
      })
    }
  }
</script>

<style lang="stylus" scoped>
  .song-label {
    width: 100vw;
    height: 100vh;
    position fixed
    top 0
    background-color #ffffff
  }
  .scroll {
    overflow auto
    height: calc(100vh - 50px);
  }
  .scroll::-webkit-scrollbar{
    width: 0 !important
    display:none;
  }
  .song-label-enter, .song-label-leave-to {
    opacity 0
    top 100px
  }
  .song-label-enter-active, .song-label-leave-active {
    transition: .1s;
  }
  .shuoming {
    color #a0a0a0
    font-size 12px
  }
  .bainji {
    padding 2px 10px
    border 1px solid #e85515
    border-radius 10px
    font-size 12px
    color #e85515
  }
  .label-item {
    width: (100% / 4);
    height: 30px;
    display flex
    justify-content center
    align-items center
    margin-bottom 10px
    .border {
      width: 90%;
      height: 100%;
      border-radius 23px
      background-color #f5f5f5
      display flex
      justify-content center
      align-items center
      font-size 12px
    }
    .active {
      opacity .5
    }
  }
</style>