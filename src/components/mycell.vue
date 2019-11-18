<template>
<div class="cell">
    <span>{{title}}</span>
    <div>
        <span>{{desc}}</span>
        <span class="iconfont iconjiantou1">></span>
    </div>
</div>
</template>

<script>
export default {
  props: ['title', 'desc']
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
