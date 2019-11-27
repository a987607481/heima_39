<template>
  <div class="index">
    <div class="header">
      <div class="logo iconfont iconnew"></div>
      <div class="search" @click="$router.push({ path: '/search'})">
        <van-icon name="search" />搜索新闻
      </div>
      <van-icon name="user-circle-o" class="icon_user" @click="goPersonal" />
    </div>
    <van-tabs v-model="active" sticky swipeable>
      <van-tab :title="value.name" v-for="(value,index) in cateList" :key="index">
        <van-list
          :immediate-check="false"
          :offset="5"
          v-model="value.loading"
          :finished="value.finished"
          finished-text="没有更多了"
          @load="onLoad"
          loading-text="正在玩命加载....."
        >
          <van-pull-refresh v-model="value.isLoading" @refresh="onRefresh">
             <articleBlock v-for="(sv,si) in value.articleList" :key="si" :post="sv" @click="$router.push({path:`/articleDeatil/${sv.id}`})"></articleBlock>
          </van-pull-refresh>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getCateList } from '@/apis/category.js'
import { getArticleList } from '@/apis/article.js'
import articleBlock from '@/components/articleBlock.vue'
export default {
  components: {
    articleBlock
  },
  data () {
    return {
      active: localStorage.getItem('heima_39_id') ? 1 : 0,
      cateList: []
    }
  },
  methods: {
    goPersonal () {
      let token = localStorage.getItem('heima_39_Authorization')
      if (token) {
        this.$router.push(`/personal/${localStorage.getItem('heima_39_id')}`)
      } else {
        this.$router.push({ name: 'Login' })
      }
    },
    async init (callback) {
      // 默认加载第一页
      let res = await getArticleList({
        pageIndex: this.cateList[this.active].pageIndex,
        pageSize: this.cateList[this.active].pageSize,
        category: this.cateList[this.active].id
      })

      callback && callback()

      this.cateList[this.active].articleList.push(...res.data.data)
      // 设置本次数据加载结束
      this.cateList[this.active].loading = false
      // 判断数据是否已经完全加载完毕
      if (res.data.data.length < this.cateList[this.active].pageSize) {
        this.cateList[this.active].finished = true
      }
    },
    // 上拉加载
    onLoad () {
      this.cateList[this.active].pageIndex++
      // this.init()
      setTimeout(() => {
        this.init()
      }, 2000)
    },
    // 下拉刷新
    onRefresh () {
      this.cateList[this.active].pageIndex = 1
      this.cateList[this.active].articleList.length = 0
      this.init(() => {
        this.cateList[this.active].isLoading = false
        this.cateList[this.active].finished = false
      })
    }
  },
  watch: {
    active () {
      if (this.cateList[this.active].articleList.length === 0) {
        this.init()
      }
    }
  },
  async mounted () {
    let res = await getCateList()
    // console.log(res)
    if (res.data.data && res.data.data.length > 0) {
      this.cateList = res.data.data

      this.cateList = this.cateList.map(value => {
        return {
          ...value,
          articleList: [],
          pageIndex: 1,
          pageSize: 5,
          loading: false, // 上拉加载更多数据的加载状态，如果为true,则说明正在加载数据
          finished: false, // 上拉加载更多 数据的完成状态，finished为true说明没有更多数据了
          isLoading: false// 下拉刷新
        }
      })
      console.log(this.cateList)
      this.init()
    }
  }
}
</script>

<style lang='less' scoped>
.index {
  .header {
    height: 50/360 * 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f00;
    .logo {
      width: 50/360 * 100vw;
      height: 50/360 * 100vw;
      color: #fff;
      font-size: 60/360 * 100vw;
      padding: 0 15/360 * 100vw;
    }
    .search {
      flex: 1;
      height: 36/360 * 100vw;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 18/360 * 100vw;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16/360 * 100vw;
      .van-icon {
        padding: 0px 5/360 * 100vw;
      }
    }
    .icon_user {
      width: 32/360 * 100vw;
      padding: 0 10/360 * 100vw;
      color: #fff;
      font-size: 25/360 * 100vw;
    }
  }
}
</style>
