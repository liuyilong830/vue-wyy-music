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
            <span class="bainji" v-if="!flag" @click="setFlag">编辑</span>
            <span class="wancheng" v-else @click="setFlag">完成</span>
          </template>
          <template v-slot:label-item>
            <div class="label-list1">
              <transition-group name="list" tag="ul">
                <li class="label-item" v-for="(item,index) in list" :key="index" ref="myLabels">
                  <div class="border" @touchstart="touchStart" @touchend="touchEnd" :class="{flex: flag}" @click="deleteItem(index)">
                    <span class="iconfont icon-hot" v-if="item.hot && !flag"></span>
                    <span v-if="flag" class="public">-</span>
                    <span class="item-name">{{item.name}}</span>
                  </div>
                </li>
              </transition-group>
            </div>
          </template>
        </labels>
        <labels v-for="(item,index) in labels" :key="index">
          <template v-slot:title>
            <span>{{item.name}}</span>
          </template>
          <template v-slot:label-item>
            <div class="label-item" v-for="(value,i) in item.list" :key="i" :ref="`labelItem${index}_${i}`">
              <div class="border"
                   :class="{active: list.find(val => val.name == value.name), flex: flag}"
                   @touchstart="touchStart"
                   @touchend="touchEnd"
                   @click="addLabel(value,i,index)">
                <span class="iconfont icon-hot" v-if="value.hot && !flag"></span>
                <span v-if="flag" class="public">+</span>
                <span class="item-name">{{value.name}}</span>
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
    props: {
      list: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      confirmBack() {
        this.$emit('click', !this.$attrs.val1)
      },
      setFlag() {
        this.flag = !this.flag
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
          if(this.time >= 1) this.flag = true
        }, 1000)
      },
      touchEnd() {
        clearInterval(this.timer)
      },
      addLabel(value,i,index) {
        if(!this.flag || this.list.find(val => val == value.name)) return
        this.list.push({hot: value.hot , name: value.name})
      },
      deleteItem(index) {
        if(!this.flag) return
        this.list.splice(index, 1)
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
  .wancheng {
    padding 2px 10px
    border 1px solid #e85515
    border-radius 10px
    font-size 12px
    color #fff
    background-color #e85515
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
      text-align center
      font-size 12px
      .icon-hot {
        width: 20px;
        color red
      }
      .item-name {
         width: (100% - 35px);
         text-overflow ellipsis
         overflow hidden
         white-space nowrap
       }
    }
    .flex {
      width: 90%;
      height: 100%;
      border-radius 23px
      background-color #f5f5f5
      display flex
      justify-content center
      align-items center
      font-size 12px
      text-align center
      .public {
        width: 20px;
        font-size 16px
      }
      .item-name {
        width: (100% - 35px);
        text-overflow ellipsis
        overflow hidden
        white-space nowrap
      }
    }
    .active {
      opacity .5
    }
  }
  .label-list1 {
    display flex
    flex-wrap wrap
    width: 100%;
  }
  .label-list1 ul:nth-child(1) {
    display flex
    flex-wrap wrap
    width: 100%;
  }
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translate(0,60px);
  }
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
</style>