<template>
  <div class="register-setNickname">
    <nav-bar @confirmBack='confirmBack'>
      <template v-slot:center>
        <span>给自己取一个昵称</span>
      </template>
    </nav-bar>
    <div class="show-img">
      <img src="~assets/images/login.jpg" alt="">
    </div>
    <div class="phone">
      <div class="relative">
        <input type="text" name="neckName" v-model="nickName" placeholder="设置您的云音乐昵称">
        <i class="iconfont icon-shouji"></i>
        <i class="iconfont icon-cha" @click="clearName" v-show="nickName.length >= 1"></i>
      </div>
    </div>
    <div class="next">
      <div class="btn" @click="toFindPage">开启云音乐</div>
    </div>

    <van-loading type="spinner" v-show="loading"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  import PassWord from './PassWord'

  import {newUserLogin,initNickName} from 'api/api.js'
  import { Toast,Loading  } from 'vant'
  import {mapGetters} from 'vuex'
  export default {
    name: 'RegisterSetNickName',
    components: {
      NavBar,
      PassWord,
      VanLoading: Loading 
    },
    model: {
      prop: 'val1',
      event: 'click'
    },
    data() {
      return {
        nickName: '',
        loading: false
      }
    },
    computed: {
      ...mapGetters(['getPhone','getPassword'])
    },
    methods: {
      toFindPage() {
        var captcha = window.localStorage.getItem('code')
        this.loading = true
        newUserLogin(captcha,this.getPhone,this.getPassword,this.nickName).then(res => {
          if(res.code === 200) {
            initNickName(this.nickName).then(res => {
              this.loading = false
              console.log(res)
              // if(res.code === 200) {
                this.$router.replace('/')
              // }
            })
          }
        })
      },
      confirmBack() {
        this.$emit('click',!this.$attrs.val1)
      },
      clearName() {
        this.neckName = ''
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .register-setNickname {
    width 100vw
    height 100vh
    background-color #fff
    position fixed
    top 0
  }
  .show-img {
    text-align center
  }
  .show-img img {
    width 50%
  }
  .phone {
    box-sizing border-box
    padding 5px 10px 0
    width 100vw
    height 40px
  }
  .relative {
    position relative
    width 100%
    height 100%
  }
  .phone input {
    box-sizing border-box
    padding 0 40px
    width 100%
    height 100%
    border none 
    border-bottom 1px solid #cccccc
    font-size 16px
  }
  .phone .icon-shouji {
    position absolute
    left 10px
    top 50%
    transform translateY(-50%)
  }
  .phone .icon-cha {
    position absolute
    right 10px
    top 50%
    transform translateY(-50%)
  }
  .next {
    box-sizing border-box
    padding 0 10px 
    margin-top 20px
    width 100vw
    height 40px
    line-height 40px
  }
  .btn {
    width 100%
    height 100%
    border-radius 15px
    background-color #fb3533
    color #ffffff
    text-align center
    font-size 16px
  }
  .van-loading {
    margin-top 30px
    display flex
    justify-content center
  }
</style>