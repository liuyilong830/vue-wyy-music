<template>
  <div class="code-login">
    <nav-bar @confirmBack='confirmBack'>
      <template v-slot:center>
        <span>手机验证码</span>
      </template>
    </nav-bar>
    <div class="send-code">
      <div class="phone">
        <span class="title">验证码已发送至</span>
        <p><span>+86 </span><span>{{phone}}</span></p>
      </div>
      <div class="refresh">
        <span v-if="time !== 60" class="await">重新发送{{time}}s</span>
        <span v-else @click="next">获取验证码</span>
      </div>
    </div>
    <van-password-input
      :value="value"
      :mask="false"
      :focused="showKeyboard"
      @focus="showKeyboard = true"
      length='4'
    />
    <van-number-keyboard
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false"
    />

    <register-by-phone v-model="isRegister" v-show="isRegister"></register-by-phone>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  import RegisterByPhone from './RegisterByPhone'
  import { PasswordInput,NumberKeyboard, Toast } from 'vant'
  import {sendCode,testCode} from 'api/api.js'
  export default {
    name: 'TestCodeLogin',
    components: {
      NavBar,
      VanPasswordInput: PasswordInput,
      VanNumberKeyboard: NumberKeyboard,
      RegisterByPhone
    },
    model: {
      prop: 'val1',
      event: 'click'
    },
    data() {
      return {
        value: '', // 输入的验证码的值
        showKeyboard: false,
        time: 60, // 重新获取验证码的倒数时间
        isRegister: false, // 是否展示输入注册密码的界面
        code: false, // 记录是否发送了获取验证码的请求
      }
    },
    props: ['phone'], // 获取手机号
    methods: {
      // 返回操作
      confirmBack() {
        this.$emit('click',!this.$attrs.val1)
      },
      // 验证验证码
      testCode(value) {
        testCode(this.phone,value).then(res => {
          if(res.code === 200) {
            console.log(11)
            window.localStorage.setItem('code',value)
            return this.isRegister = true
          } else {
            Toast('验证码错误')
          }
        })
      },
      // 输入数字操作
      onInput(num) {
        this.value += num
        this.value = this.value.length >= 4? this.value.substr(0,4) : this.value
        // 验证验证码
        if(this.value.length == 4) {
          if(!this.code) {
            Toast('请先获取验证码')
          } else if(this.code) {
            this.testCode(this.value)
          }
        }
      },
      // 删除数字操作
      onDelete() {
        this.value = this.value.substring(0,this.value.length-1)
      },
      // 倒计时操作
      CountDown() {
        var timer = setInterval(() => {
          --this.time
          if(this.time <= 0) {
            clearInterval(timer)
            this.time = 60
          }
          window.localStorage.setItem('time',this.time)
        },1000)
      },
      // 点击重新获取验证码的操作
      next() {
        this.sendCode()
      },
      // 发送验证码的操作
      sendCode() {
        this.CountDown()
        sendCode(this.phone).then(res => {
          console.log(res)
          if(res.code === 200) {
            this.code = true
            window.localStorage.setItem('codeFlag',this.code)
            return 
          }else {
            Toast('验证码获取失败！请稍后获取')
          }
        }).catch(err => {
          Toast('一个手机号一天只能获取最多五次验证码')
          console.log(err)
        })
      }
    },
    created() {
      this.time = parseInt(window.localStorage.getItem('time')) || this.time
      this.code = window.localStorage.getItem('codeFlag') == 'true'? true : this.code
      if(this.time < 60) {
        this.CountDown()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .code-login {
    background-color #fff
    width 100vw
    height 100vh
    position fixed
    z-index 999
    top 0
  }
  .send-code {
    display flex
    justify-content space-between
    box-sizing border-box
    padding 0 10px
    margin-top 20px
    width 100vw
    height 50px
    align-items center
  }
  .phone {
    flex 70%
    display flex
    flex-direction column
    justify-content space-around
    height 100%
  }
  .phone .title {
    font-size 16px
  }
  .refresh {
    flex 30%
    text-align right 
  }
  .refresh .await {
    color #cccccc
  }
</style>