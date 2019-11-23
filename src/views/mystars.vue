<template>
  <div class="stars">
      <myheader title='我的收藏'>
          <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
      </myheader>
      <div class="list">
          <articleblock v-for='value in starsList' :key='value.id' :post='value' @click="$router.push({path: `/articleDeatil/${value.id}`})"></articleblock>
      </div>
  </div>
</template>

<script>
import myheader from '@/components/myheader.vue'
import articleblock from '@/components/articleBlock.vue'
import { getUserStars } from '@/apis/users.js'
export default {
  components: {
    myheader, articleblock
  },
  data () {
    return {
      starsList: []
    }
  },
  async mounted () {
    let res = await getUserStars()
    this.starsList = res.data.data
    console.log(this.starsList)
  }
}
</script>

<style>

</style>
