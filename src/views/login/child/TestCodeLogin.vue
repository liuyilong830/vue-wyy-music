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
        <span v-else @click="next">重新获取</span>
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
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  import { PasswordInput,NumberKeyboard } from 'vant'
  import {sendCode} from 'api/api.js'
  export default {
    name: 'TestCodeLogin',
    components: {
      NavBar,
      VanPasswordInput: PasswordInput,
      VanNumberKeyboard: NumberKeyboard
    },
    model: {
      prop: 'val1',
      event: 'click'
    },
    data() {
      return {
        value: '',
        showKeyboard: false,
        time: 60,
        count: 1
      }
    },
    props: ['phone'],
    methods: {
      confirmBack() {
        this.$emit('click',!this.$attrs.val1)
      },
      onInput(num) {
        this.value += num
      },
      onDelete() {
        this.value = this.value.substring(0,this.value.length-1)
      },
      CountDown() {
        var timer = setInterval(() => {
          --this.time
          if(this.time <= 0) {
            clearInterval(timer)
            this.time = 60
            window.localStorage.setItem('time',this.time)
          }
        },1000)
      },
      next() {
        this.sendCode()
      },
      sendCode() {
        window.localStorage.setItem('count',this.count ++)
        this.CountDown()
        sendCode(this.phone).then(res => {
          console.log(res)
        })
      }
    },
    created() {
      window.localStorage.setItem('count',this.count)
    },
    mounted() {
      this.count = window.localStorage.getItem('count')
      this.time = window.localStorage.getItem('time') || this.time
      if(this.count == 1) {
        this.sendCode()
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