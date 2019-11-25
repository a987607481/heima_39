<template>
  <div class="sour">
    <!-- 此组件是精彩回复下面的嵌套 -->
    <mycomment v-if="data.parent" :data="data.parent" @replayComment="sendComment(data.parent)"></mycomment>
    <p>
      <span>{{data.user.nickname}} &nbsp;&nbsp;2小时前</span>
      <span @click="sendComment(data)">回复</span>
    </p>
    <div>{{data.content}}</div>
  </div>
</template>

<script>
export default {
  name: 'mycomment',
  props: ['data'],
  methods: {
    sendComment (data) {
      this.$emit('replayComment', data)
    }
  }
}
</script>

<style lang='less' scoped>
.sour {
  border: 1px solid #ddd;
  padding: 5px;
  color: #999;
  line-height: 25px;
  > p {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
  }
  > div {
    font-size: 13px;
  }
}
</style>
