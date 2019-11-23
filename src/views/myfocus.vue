<template>
  <div class="focus">
    <myheader title="我的关注">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </myheader>
    <div class="list">
      <div class="box" v-for="(value,index) in focusList" :key="index">
        <img :src="value.head_img" alt />
        <div class="center">
          <p>{{value.nickname}}</p>
          <span>2019-9-9</span>
        </div>
        <span @click="cancelFocu(value.id,index)">取消关注</span>
      </div>
    </div>
  </div>
</template>

<script>
import myheader from '@/components/myheader.vue'
import { getUserFocus, unfocusUser } from '@/apis/users.js'
export default {
  data () {
    return {
      focusList: []
    }
  },
  components: {
    myheader
  },
  methods: {
    // 取消关注
    async cancelFocu (id, index) {
      let res = await unfocusUser(id)
      console.log(res)
      if (res.data.message === '取消关注成功') {
        this.$toast.success(res.data.message)
        this.focusList.splice(index, 1)
      }
    }
  },
  async mounted () {
    let res = await getUserFocus()
    this.focusList = res.data.data
    this.focusList.forEach(value => {
      value.head_img = localStorage.getItem('heima_39_baseurl') + value.head_img
    })
    console.log(this.focusList)
  }
}
</script>

<style lang='less' scoped>
.list {
  .box {
    display: flex;
    padding: 25px 10px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    > img {
      display: block;
      width: 50/360 * 100vw;
      height: 50/360 * 100vw;
      border-radius: 50%;
      padding: 0 10px;
    }
    > .center {
      flex: 1;
      > p {
        line-height: 30px;
        font-size: 14px;
      }
      > span {
        font-size: 12px;
        color: #999;
      }
    }
    > span {
      height: 30px;
      background-color: #eee;
      font-size: 13px;
      border-radius: 30px;
      line-height: 30px;
      padding: 0px 15px;
    }
  }
}
</style>
