<template>
  <div>
    <div class="music-login">
      <div class="logo">
        <img src="~assets/images/logo2.png" alt="">
      </div>
      <div class="login-phone">
        <div class="btn" @click="loginClick">手机号登录</div>
        <div class="tiyan" @click="tiyanClick">立即体验</div>
        <div class="icon">
          <i class="iconfont icon-weixin"></i>
          <i class="iconfont icon-QQ"></i>
          <i class="iconfont icon-weibo"></i>
          <i class="iconfont icon-wangyi" @click="emailBy163"></i>
        </div>
        <div class="agreement">
          <span class="button" @click="agress = !agress">{{agress == true? '√' : ''}}</span>
          <span>同意</span>
          <a href="">《用户协议》</a>
          <a href="">《隐私政策》</a>
          <a href="">《儿童隐私政策》</a>
        </div>
      </div>
    </div>
    <phone-login v-model="isShow" v-show="isShow"></phone-login>
    <pass-word v-model="showEmail" v-show="showEmail" :showEmail='showEmail'></pass-word>
  </div>
</template>

<script>
  import PhoneLogin from './child/PhoneLogin'
  import PassWord from './child/PassWord'
  import { Toast } from 'vant'
  export default {
    name: 'Login',
    components: {
      PhoneLogin,
      PassWord
    },
    data() {
      return {
        agress: false,
        isShow: false,
        showEmail: false
      }
    },
    methods: {
      agreement() {
        if(!this.agress) {
          Toast('请勾选同意《用户协议》《隐私政策》《儿童隐私政策》')
          return false
        }
        return true
      },
      loginClick() {
        if(this.agreement()) {
          this.isShow = true
        }
      },
      tiyanClick() {
        if(this.agreement()) {
          this.$router.replace('/find')
        }
      },
      emailBy163() {
        if(this.agreement()) {
          this.showEmail = true
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .music-login {
    background-color #dc3130
    width 100vw;
    height 100vh;
    position relative
  }
  .logo {
    padding-top 120px;
    width 30vw;
    margin 0 auto;
    text-align center;
  }
  .logo img {
    width 70%;
    border-radius 50%;
    background-color #f12222
  }
  .login-phone {
    position absolute
    left 50%
    transform translateX(-50%)
    bottom 0
  }
  .btn {
    width 75vw
    height 35px
    margin 0 auto
    background-color #fff
    border-radius 15px
    color #dc3130
    font-size 15px
    text-align center
    line-height 35px
  }
  .tiyan {
    width 75vw
    height 35px
    margin 15px auto 
    background-color #dc3130
    border-radius 15px
    color #fff
    border 1px solid #fff
    font-size 15px
    text-align center
    line-height 35px
  }
  .icon {
    width 80vw
    height 40px
    margin 0 auto 
    display flex
    justify-content space-around
    align-items center
  }
  .icon .iconfont {
    font-size 16px
    padding 5px
    color #ffffff
    border 1px solid #ffffff
    border-radius 50%
  }
  .agreement {
    width 75vw
    display flex
    margin 15px auto 
    font-size 12px
    align-items center
    justify-content space-between
  }
  .agreement .button {
    width 8px
    height 8px
    border 1px solid #ffffff
    border-radius 3px
    color #ffffff
  }
  .agreement a {
    color #ffffff
  }
</style>