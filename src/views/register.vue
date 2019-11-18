<template>
  <div id="app">
    <div class="container">
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="inputs">
       <myinput placeholder='请输入手机号'
       v-model="userobj.username"
       :rules='/^1\d{10}$/'
       msg_err='手机号输入不正确'
       ></myinput>
       <myinput placeholder='请输入密码'
       type='password'
       v-model="userobj.password"
       :rules='/^\w{3,16}$/'
       msg_err='请输入3-16位的密码'
       ></myinput>
       <myinput placeholder='请输入昵称'
       v-model="userobj.nickname"
       :rules='/^\w+$/'
       msg_err='手机号输入不正确'
       ></myinput>
      </div>
      <p class="tips">
        有账号？
        <a href="#/login" class>登录</a>
      </p>
     <mybutton text='注册' type='danger' @click="register"></mybutton>
    </div>
  </div>
</template>

<script>
import mybutton from '@/components/mybutton.vue'
import myinput from '@/components/myinput.vue'
import { register } from '@/apis/users.js'
export default {
  data () {
    return {
      userobj: {
        username: '',
        password: '',
        nickname: ''
      }
    }
  },
  methods: {
    async register () {
      var res = await register(this.userobj)
      if (res.data.message === '注册成功') {
        this.$toast.fail('注册成功,请进行登陆')
        this.$router.push({ name: 'Login' })
      } else {
        this.$toast.fail('注册失败')
      }
    }
  },
  components: {
    mybutton, myinput
  }
}
</script>

<style lang='less' scoped>
.container {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>
