<template>
  <div class="btn" @click="handlerclick"
  :class="{danger:type==='danger',primary:type==='primary',
  info:type==='info',warning:type==='warning',
  }"
  >{{text}}</div>
</template>

<script>
export default {
  props: ['text', 'type'],
  methods: {
    handlerclick (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style>
.btn {
  width: 90%;
  height: 40px;
  color: #fff;
  line-height: 40px;
  text-align: center;
  background-color: skyblue;
  font-size: 20px;
  border-radius: 5px;
  padding: 5px 0;
  margin: 0 auto;
}
.danger {
  background-color: #f00;
}
.primary {
  background-color: rgb(17, 219, 94);
}
.info {
  background-color: #999;
}
.warning {
  background-color: orange;
}
</style>
