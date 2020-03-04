<template>
  <div class="register-by-phone">
    <nav-bar @confirmBack='confirmBack'>
      <template v-slot:center>
        <span>手机号注册</span>
      </template>
    </nav-bar>
    <div class="phone">
      <div class="relative">
        <input type="password" name="phone" v-model="password" placeholder="设置登录密码，不少于6位">
        <i class="iconfont icon-shouji"></i>
        <i class="iconfont icon-cha" @click="clearPhone" v-show="password.length >= 1"></i>
      </div>
    </div>
    <div class="next">
      <div class="btn" @click="registerNext">下一步</div>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import { Toast } from 'vant'
  export default {
    name: 'RegisterByPhone',
    components: {
      NavBar
    },
    model: {
      prop: 'val1',
      event: 'click'
    },
    data() {
      return {
        password: ''
      }
    },
    computed: {
      testPassWord() {
        // 密码不能有'"汉字。，——
        return /[(\.\*\!\@\#\$\%\^\&\(\)\-\+\=\|\[\]\{\};:,.<>\/\?~`)0-9a-z]/ig.test(this.password)
      }
    },
    methods: {
      confirmBack() {
        this.$emit('click',!this.$attrs.val1)
      },
      clearPhone() {
        this.password = ''
      },
      registerNext() {
        if(this.password.length == 6 && this.testPassWord) {
          if(!window.localStorage.getItem('codeFlag')) {
            return Toast('验证码失效，请重新获取')
          }
          // 下一步
          
        } else {
          Toast('请确保密码长度不小于6位，且密码不得出现\' \" 汉字 。，——这类非法特殊符号')
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .register-by-phone {
    background-color #fff
    width 100vw
    height 100vh
    position fixed
    top 0
    z-index 999
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
</style>