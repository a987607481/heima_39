<template>
<input type="text" class="inp" @input="handlerinput"
:class="{red:statu==='red',blue:statu==='blue'}"
@blur="handlerblur"
>
</template>

<script>
export default {
  props: ['rules', 'msg_err'],
  data () {
    return {
      statu: ''
    }
  },
  methods: {
    handlerinput (e) {
      this.$emit('input', e.target.value)
      if (this.rules) {
        if (this.rules.test(e.target.value) || !e.target.value) {
          this.statu = 'red'
        } else {
          this.statu = 'blue'
        }
      }
    },
    handlerblur (e) {
      if (this.rules) {
        if (!this.rules.test(e.target.value)) {
          this.statu = 'blue'
          this.$toast(this.msg_err)
        }
      }
    }
  }
}
</script>

<style lang='less'>
.inp{
    width: 100%;
    height: 40px;
    border: none;
    border-bottom: 2px red solid;
    line-height: 40px;
    font-size: 18px;
    outline: none;
    padding-left: 10px;
    box-sizing: border-box
}
.red {
  border-color: Red;
}
.blue {
  border-color: blue;
}
</style>
