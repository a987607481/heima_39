<template>
<div class="comments">
    <myheader title="精彩评论">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </myheader>
    <div class="commentsList" v-for="value in articleComments" :key="value.id">
      <div class="item">
        <div class="head">
          <img :src="value.user.head_img" alt />
          <div>
            <p>{{value.user.nickname}}</p>
            <span>2小时前</span>
          </div>
          <span @click='replayComment(value)'>回复</span>
        </div>
        <!-- 评论的嵌套组件 -->
        <commentItem v-if='value.parent' :data='value.parent' @replayComment='replayComment'></commentItem>
        <div class="text">{{value.content}}</div>
      </div>
    </div>
    <!-- 底部组件 -->
    <commentFooter :post='article' @refreshComment='init();++article.comment_length' :replayobj='obj' @resetreplayobj='obj=null'></commentFooter>
  </div>
</template>

<script>
import myheader from '@/components/myheader.vue'
import commentFooter from '@/components/commentFooter.vue'
import commentItem from '@/components/commentItem.vue'
import { getArticleComments, getArticleById } from '@/apis/article'
export default {
  data () {
    return {
      article: {},
      articleComments: [],
      obj: {}
    }
  },
  components: {
    myheader, commentFooter, commentItem
  },
  methods: {
    async init () {
      let res = await getArticleComments(this.id)
      this.articleComments = res.data.data
      this.articleComments.forEach(value => {
        value.user.head_img = value.user.head_img ? localStorage.getItem('heima_39_baseurl') + value.user.head_img : localStorage.getItem('heima_39_baseurl') + '/uploads/image/IMG1568705287936.jpeg'
      })
      window.scrollTo(0, 0)
    },
    replayComment (value) {
      this.obj = value
    }
  },
  async mounted () {
    this.id = this.$route.params.id
    this.init()
    let res2 = await getArticleById(this.id)
    this.article = res2.data.data
  }
}
</script>

<style lang='less' scoped>
.commentsList {
    border-top: 5px solid #ddd;
    padding: 0 15px 50px;
    box-sizing: border-box;
    .item {
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
      .head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        > img {
          width: 50/360 * 100vw;
          height: 50/360 * 100vw;
          display: block;
          border-radius: 50%;
        }
        > div {
          flex: 1;
          display: flex;
          flex-direction: column;
          margin-left: 10px;
          > span {
            font-size: 12px;
            color: #999;
            line-height: 25px;
          }
        }
        > span {
          color: #999;
          font-size: 13px;
        }
      }
      .text {
        font-size: 14px;
        color: #333;
        padding: 20px 0 10px 0;
      }
    }
    .more {
      width: 100px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 15px;
      margin: 20px auto;
      font-size: 13px;
    }
  }
</style>
