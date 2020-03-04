<template>
  <div class="phone-login">
    <div v-if="isShow">
      <nav-bar @confirmBack='confirmBack'>
        <template v-slot:center>
          <span>手机号登录</span>
        </template>
      </nav-bar>
      <div class="warning">未注册手机号登录后将自动创建账号</div>
      <div class="phone">
        <div class="relative">
          <input type="number" name="phone" v-model="phone" placeholder="请输入手机号">
          <i class="iconfont icon-shouji"></i>
          <i class="iconfont icon-cha" @click="clearPhone" v-show="phone.length >= 1"></i>
        </div>
      </div>
      <div class="next">
        <div class="btn" @click="nextClick">下一步</div>
      </div>
    </div>
    <pass-word v-else v-model="isShow" :phone='phone'></pass-word>
    <test-code-login v-if="isNewUser" v-model="isNewUser" :phone='phone'></test-code-login>

    <van-loading type="spinner" v-show="loading"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  import PassWord from './PassWord'
  import TestCodeLogin from './TestCodeLogin'
  import { Toast,Loading  } from 'vant'
  import {testPhone} from 'api/api.js'
  export default {
    name: 'PhoneLogin',
    components: {
      NavBar,
      PassWord,
      TestCodeLogin,
      VanLoading: Loading 
    },
    model: {
      prop: 'val1',
      event: 'click'
    },
    data() {
      return {
        phone: '',
        isShow: true,
        isNewUser: false,
        loading: false
      }
    },
    computed: {
      testPhone() {
        return /1[3,5,6,7,8,9]\d{9}/.test(this.phone)
      }
    },
    watch: {
      phone() {
        this.phone = this.phone.length >= 11? this.phone.substring(0,11) : this.phone
      }
    },
    methods: {
      clearPhone() {
        this.phone = ''
      },
      nextClick() {
        if(this.testPhone) {
          this.loading = true
          testPhone(this.phone).then(res => {
            if(res.exist == -1) {
              this.isNewUser = true
            } else if(res.exist == 1) {
              this.isShow = false
            }
            this.loading = false
          }).catch(err => console.log(err))
        } else if(this.phone == '') {
          Toast('请输入手机号')
        } else {
          Toast('请输入正确的手机号')
        }
      },
      confirmBack() {
        this.$emit('click',!this.$attrs.val1)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .phone-login {
    background-color #fff
    width 100vw
    height 100vh
    position fixed
    z-index 999
    top 0
  }
  .warning {
    color #b5b5b5
    font-size 14px
    padding-left 10px
    padding-bottom 15px
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