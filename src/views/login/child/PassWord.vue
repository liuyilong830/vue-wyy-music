<template>
  <div class="phone-login">
    <nav-bar @confirmBack='confirmBack'>
      <template v-slot:center>
        <span v-if="!showEmail">密码登录</span>
        <span v-else>网易邮箱账号登录</span>
      </template>
    </nav-bar>
    <div class="phone" v-if="showEmail">
      <div class="relative">
        <input type="email" name="email" v-model="email" placeholder="网易邮箱账号登录">
      </div>
    </div>
    <div class="phone">
      <div class="relative">
        <input type="password" name="phone" v-model="password" placeholder="请输入密码">
        <!-- <i class="iconfont icon-shouji"></i> -->
        <span class="unknow" @click="unknowPwd">忘记密码？</span>
      </div>
    </div>
    <div class="next">
      <div class="btn" v-if="flag" @click="LoginClick">登录</div>
      <div class="btn" v-else>登录中...</div>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  import { Toast } from 'vant'
  import {postLogin,emailLogin} from 'api/api.js'
  import {mapGetters} from 'vuex'
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
        password: '',
        flag: true,
        pwdOremail: true,
        email: ''
      }
    },
    props: {
      showEmail: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      testPassWord() {
        // 密码不能有'"汉字。，——
        return /[(\.\*\!\@\#\$\%\^\&\(\)\-\+\=\|\[\]\{\};:,.<>\/\?~`)0-9a-z]/ig.test(this.password)
      },
      testEmail() {
        return /^[a-z0-9]+@163\.com/i.test(this.email)
      },
      ...mapGetters(['getPhone'])
    },
    methods: {
      confirmBack() {
        this.$emit('click',!this.$attrs.val1)
      },
      byPhoneLogin() {
        this.flag = false
        postLogin({phone: this.$attrs.phone || this.getPhone ,password: this.password}).then(res => {
          console.log(res)
          if(res.code === 200) {
            this.$store.commit('setAccount',res.account)
            this.$store.commit('setProfile',res.profile)
            this.$store.commit('setLoginType',res.loginType)
            this.$store.commit('setBindings',res.bindings)
            this.$store.commit('setToken',res.token)
            this.$router.replace('/find')
          } else {
            Toast('密码错误')
          }
        })
      },
      byEmailLogin() {
        this.flag = false
        emailLogin(this.email,this.password).then(res => {
          console.log(res)
          if(res.code === 200) {
            this.$store.commit('setAccount',res.account)
            this.$store.commit('setToken',res.token)
            this.$store.commit('setBindings',res.bindings)
            this.$store.commit('setLoginType',res.loginType)
            this.$router.replace('/find')
          } else {
            this.flag = true
          }
        }).catch(err => {
          this.flag = true
          console.log(err.message)
        })
      },
      LoginClick() {
        if(this.showEmail) {
          if(this.email == '') {
            return Toast('请先输入邮箱')
          }else if(!this.testEmail) {
            return Toast('请输入合法的网易邮箱')
          }
        }
        if(this.testPassWord) {
          if(!this.showEmail) {
            this.byPhoneLogin()
          }
          if(this.showEmail) {
            this.byEmailLogin()
          }
        } else {
          Toast('密码不能有\'"汉字。，——')
        }
      },
      unknowPwd() {
        
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
    margin-bottom 10px
  }
  .relative {
    position relative
    width 100%
    height 100%
  }
  .phone input {
    box-sizing border-box
    padding-right 80px
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
  .phone .unknow {
    position absolute
    color #2fc1f1
    right 0
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