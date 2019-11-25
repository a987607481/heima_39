<template>
<!-- 此组件为最下方回复组件 -->
  <div class="comment">
    <div class="addcomment" v-show="!isFocus">
      <input type="text" placeholder="写跟帖" @click="isFocus=!isFocus" />
      <span class="comment" @click="$router.push({path:`/comments/${post.id}`})">
        <i class="iconfont iconpinglun-"></i>
        <em>{{post.comment_length}}</em>
      </span>
      <i class="iconfont iconshoucang" @click="starArticle" :class="{active:post.has_star}"></i>
      <i class="iconfont iconfenxiang"></i>
    </div>
    <div class="inputcomment" v-show="isFocus">
      <textarea ref="commtext" rows="5"  :placeholder="placeholder" autofocus></textarea>
      <div>
        <span @click="sendComment">发送</span>
        <span @click="cancelcomment">取消</span>
      </div>
    </div>
  </div>
</template>

<script>
import { startThisArticle, publishComment } from '@/apis/article.js'
export default {
  props: ['post', 'replayobj'],
  data () {
    return {
      isFocus: false,
      placeholder: ''
    }
  },
  methods: {
    // 收藏
    async starArticle () {
      let res = await startThisArticle(this.post.id)
      if (res.data.message === '收藏成功') {
        this.post.has_star = true
      } else {
        this.post.has_star = false
      }
    },
    // 发送评论
    async sendComment () {
      let data = {
        content: this.$refs.commtext.value
      }
      // 当点击的是嵌套（commentltem组件）里的回复的时候，需要向数据库加上一个parent_id，使页面有嵌套效果，如果点击的是父类的回复，那么此项就为null
      if (this.replayobj) {
        data.parent_id = this.replayobj.id
      }
      let res = await publishComment(this.post.id, data)
      if (res.data.message === '评论发布成功') {
        // 发布成功向父组件发送一个事件，重新获取一次页面数据，达到刷新效果
        this.$emit('refreshComment')
        this.$refs.commtext.value = ''
        this.isFocus = false
      }
    },
    // 取消评论
    // 因为当点击回复的时候，commentltem会发送点击项的数据过来（通过子传父，父传子），此时点取消如果不做处理会导致下次点回复会没有反应（因为数据没改变，所以不会触发监听），这个时候我们可以发送一个事件给父组件，使commentltem组件发送过来的值清空，所有当再次点点击的时候数据就发生了变化，watch也能触发相应的事件
    cancelcomment () {
      this.$refs.commtext.value = ''
      this.isFocus = false
      this.$emit('resetreplayobj')
    }
  },
  watch: {
    // 子传子，这里用的方法是先子传父，然后再用父传另外一个子
    replayobj () {
      console.log(this.replayobj)
      if (this.replayobj) {
        this.isFocus = true
        this.placeholder = '@' + this.replayobj.user.nickname
        setTimeout(() => {
          this.$refs.commtext.focus()
        }, 0)
      }
    }
  }
}
</script>

<style lang='less' scoped>
.active {
  color:red;
}
.comment{
    width:100%;
    position: fixed;
    left: 0;bottom: 0;
}
.inputcomment{
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    background-color: #fff;
    align-items: flex-end;
    textarea{
        flex: 3;
        background-color: #eee;
        border:none;
        border-radius: 10px;
        padding: 10px;
    }
    div{
        padding: 20px;
    }
    span {
        display: block;
        flex: 1;
        height: 24px;
        line-height: 24px;
        padding: 0 10px;
        background-color: #f00;
        color:#fff;
        text-align: center;
        border-radius: 6px;
        font-size: 13px;
    }
}
.addcomment {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #fff;
  > input {
    flex: 4;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    border: none;
    background-color: #eee;
    padding-left: 20px;
    font-size: 14px;
  }
  i {
    font-size: 20px;
  }
  > span {
    flex: 1;
    position: relative;
    > em {
      position: absolute;
      right: 0;
      top: -5px;
      font-size: 10px;
      background-color: #f00;
      color: #fff;
      border-radius: 5px;
      padding: 3px 5px;
    }
  }
  > i {
    flex: 1;
  }
}
</style>
