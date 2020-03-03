<template>
  <div class="phone-login">
    <nav-bar @confirmBack='confirmBack'>
      <template v-slot:center>
        <span>密码登录</span>
      </template>
    </nav-bar>
    <div class="phone">
      <div class="relative">
        <input type="password" name="phone" v-model="password" placeholder="请输入密码">
        <i class="iconfont icon-shouji"></i>
        <i class="iconfont icon-cha" @click="clearPhone" v-show="password.length >= 1"></i>
      </div>
    </div>
    <div class="next">
      <div class="btn" @click="LoginClick">登录</div>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  import { Toast } from 'vant'
  import {postLogin} from 'api/api.js'
  export default {
    name: 'PassWord',
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
      LoginClick() {
        if(this.testPassWord) {
          postLogin({phone: this.$attrs.phone,password: this.password}).then(res => {
            console.log(res)
            this.$store.commit('setAccount',res.account)
            this.$store.commit('setProfile',res.profile)
            this.$store.commit('setLoginType',res.loginType)
            this.$store.commit('setBindings',res.bindings)
            this.$router.replace('/find')
          })
        } else {
          Toast('密码不能有\'"汉字。，——')
        }
      },
      clearPhone() {
        this.password = ''
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
</style>