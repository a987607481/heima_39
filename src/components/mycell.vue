<template>
<div class="cell" @click="handlerclick">
    <span>{{title}}</span>
    <div>
        <span>{{type==='password'?'*****':desc}}</span>
        <span class="iconfont iconjiantou1"></span>
    </div>
</div>
</template>

<script>
export default {
  props: ['title', 'desc', 'type'],
  methods: {
    handlerclick (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang='less' scoped>
.cell{
    display: flex;
    justify-content: space-between;
    padding: 20/360*100vw;
    align-items: center;
    border-bottom: 1px solid #ccc;
    >span{
        color: #333;
    }
    >div{
        font-size: 13px;
        color: #999;
    }
}
</style>
