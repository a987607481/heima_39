<template>
  <div class="header">
    <span>
        <slot name="left"></slot>
    </span>
    <span>{{title}}</span>
    <span>
        <slot name="right"></slot>
    </span>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style lang='less' scoped>
.header{
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #eee;
    border-bottom: 1px solid #ccc;
    span:nth-child(1), span:nth-child(3){
      padding: 0 10px;
        text-align: center;
    }
     span:nth-child(2){
         flex: 1;
         text-align: center;
     }
}
</style>
