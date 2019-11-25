<template>
  <div class="articleDeatil">
    <myheader>
      <div slot="left" @click="$router.back()" class="lefth">
        <van-icon name="arrow-left" />
        <span class="iconfont iconnew"></span>
      </div>
      <div slot="right">
        <div class="btn" @click="userFollow" :class="{active:isActive}">{{focuText}}</div>
      </div>
    </myheader>
    <div class="content" v-if="article.type === 1">
      <div class="title">{{article.title || ''}}</div>
      <div class="info">
        <span>{{article.user && article.user.nickname}}</span>
        <span>2019-11-11</span>
      </div>
      <div class="articleContent" v-html="article.content"></div>
      <div class="opt">
        <van-button
          icon="good-job-o"
          type="primary"
          round
          @click="likethisarticle"
          :class="{likeactive:article.has_like}"
        >{{article.like_length}}</van-button>
        <van-button icon="chat" type="primary" round>微信</van-button>
      </div>
    </div>
    <div class="commentList">
      <h2>精彩跟帖</h2>
      <div class="item" v-for="value in articleComments" :key="value.id">
        <div class="head">
          <img :src="value.user.head_img" alt />
          <div>
            <p>{{value.user.nickname}}</p>
            <span>2小时前</span>
          </div>
          <span @click="replayComment(value)">回复</span>
        </div>
        <!-- 评论的嵌套组件 -->
        <commentItem v-if="value.parent" :data="value.parent" @replayComment="replayComment"></commentItem>
        <div class="text">{{value.content}}</div>
      </div>
      <div class="more" @click="$router.push({path:`/comments/${article.id}`})">更多跟帖</div>
    </div>
    <!-- 底部组件 -->
    <commentFooter
      :post="article"
      @refreshComment="init();++article.comment_length"
      :replayobj="obj"
      @resetreplayobj="obj=null"
    ></commentFooter>
  </div>
</template>

<script>
import {
  getArticleById,
  likeArticle,
  getArticleComments
} from '@/apis/article.js'
import { focusUser, unfocusUser } from '@/apis/users.js'
import myheader from '@/components/myheader.vue'
import commentFooter from '@/components/commentFooter.vue'
import commentItem from '@/components/commentItem.vue'
export default {
  components: {
    myheader,
    commentFooter,
    commentItem
  },
  data () {
    return {
      article: {},
      isActive: '',
      focuText: '',
      articleComments: [],
      obj: {}
    }
  },
  methods: {
    // 判断关注或者取消
    async userFollow () {
      let res
      if (this.isActive) {
        res = await unfocusUser(this.article.user.id)
        if (res.data.message === '取消关注成功') {
          this.isActive = false
          this.focuText = '关注'
        }
      } else {
        res = await focusUser(this.article.user.id)
        if (res.data.message === '已关注' || res.data.message === '关注成功') {
          this.isActive = true
          this.focuText = '已关注'
        }
      }
      this.$toast.success(res.data.message)
    },
    // 文章点赞
    async likethisarticle () {
      let res = await likeArticle(this.article.id)
      if (res.data.message === '点赞成功') {
        ++this.article.like_length
        this.article.has_like = true
      } else {
        --this.article.like_length
        this.article.has_like = false
      }
    },
    // 获取评论数据
    async init () {
      let res2 = await getArticleComments(this.article.id)
      this.articleComments = res2.data.data
      this.articleComments.forEach(value => {
        value.user.head_img = value.user.head_img
          ? localStorage.getItem('heima_39_baseurl') + value.user.head_img
          : localStorage.getItem('heima_39_baseurl') +
            '/uploads/image/IMG1568705287936.jpeg'
      })
      console.log(this.articleComments)
    },
    replayComment (value) {
      this.obj = value
    }
  },
  async mounted () {
    let id = this.$route.params.id
    let res = await getArticleById(id)
    this.article = res.data.data
    this.isActive = this.article.has_follow
    this.focuText = this.isActive ? '已关注' : '关注'
    this.init()
  }
}
</script>

<style lang='less' scoped>
.likeactive {
  color: red !important;
  border-color: red !important;
}
.header {
  line-height: 40px;
  /deep/.left {
    vertical-align: middle;
  }
  .lefth {
    display: flex;
    align-items: center;
  }
  /deep/.left span {
    width: 100px !important;
  }
  .iconnew {
    font-size: 50px;
  }
  .btn {
    width: 60px;
    border-radius: 12px;
    border: 1px solid #ccc;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
    &.active {
      background-color: #f00;
      color: #fff;
    }
  }
}
.content {
  padding: 10px;
  .title {
    font-size: 18px;
    font-weight: 700;
    line-height: 24px;
  }
  .info {
    font-size: 12px;
    color: #999;
    > span:nth-child(2) {
      margin-left: 15px;
    }
  }
  .articleContent {
    padding: 20px 0;
    font-size: 14px;
    color: #333;
    line-height: 26px;
    text-indent: 2em;
    /deep/img {
      width: 100%;
      display: block;
    }
  }
  .opt {
    display: flex;
    justify-content: space-around;
  }
}
.commentList {
  border-top: 5px solid #ddd;
  padding: 0 15px 50px;
  box-sizing: border-box;
  > h2 {
    line-height: 50px;
    text-align: center;
  }
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
