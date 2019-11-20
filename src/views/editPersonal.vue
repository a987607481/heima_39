<template>
  <div class="edit">
    <myheader title="编辑个人信息">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </myheader>
    <div class="info">
      <div class="userimg">
        <img :src="userobj.head_img" alt />
        <van-uploader :after-read="afterRead" :before-read="beforeRead" />
      </div>
      <mycell title="名字" :desc="userobj.nickname" @click="nickshow=true;nickname=userobj.nickname"></mycell>
      <van-dialog
        v-model="nickshow"
        title="修改名字"
        show-cancel-button
        :closeOnClickOverlay="true"
        @confirm="updatenick"
      >
        <van-cell-group>
          <van-field label="名字" required clearable v-model="nickname" placeholder="请输入新名字" />
        </van-cell-group>
      </van-dialog>

      <mycell title="密码" :desc="userobj.password" type="password" @click="passshow=true"></mycell>
      <van-dialog
        v-model="passshow"
        title="修改密码"
        show-cancel-button
        :closeOnClickOverlay="true"
        @confirm="updatepass"
        :before-close="beforeClose"
      >
        <van-cell-group>
          <van-field v-model="password" label="原密码" placeholder="请输入原密码" required clearable />
          <van-field label="新密码" placeholder="请输入新密码" ref="userpwd" required />
        </van-cell-group>
      </van-dialog>
      <mycell title="性别" :desc="userobj.gender===1?'男':'女'" @click="gendershow=true"></mycell>
      <van-dialog
      v-model="gendershow"
      title="修改性别"
      show-cancel-button
      :closeOnClickOverlay='true'
       @confirm='updategender'
      >
      <van-picker :columns="['女','男']" @change="onChange" :default-index="userobj.gender"/>
      </van-dialog>
    </div>
  </div>
</template>

<script>
import mycell from '@/components/mycell.vue'
import { getUserInfoById, updateUserInfo } from '@/apis/users.js'
import myheader from '@/components/myheader.vue'
import { uploadFile } from '@/apis/upload.js'
export default {
  data () {
    return {
      userobj: {},
      nickshow: false,
      passshow: false,
      gendershow: false,
      nickname: '',
      password: '',
      genderindex: ''
    }
  },
  methods: {
    // 文件上传
    async afterRead (file) {
      var formdata = new FormData()
      formdata.append('file', file.file)
      let res = await uploadFile(formdata)
      if (res.data.message === '文件上传成功') {
        this.userobj.head_img =
          localStorage.getItem('heima_39_baseurl') + res.data.data.url
        let res2 = await updateUserInfo(this.id, {
          head_img: res.data.data.url
        })
        if (res2.data.message === '修改成功') {
          this.$toast.success('修改成功')
        } else {
          this.$toast.success('修改失败')
        }
      }
    },
    // 判断上传的是不是图片
    beforeRead (file) {
      // indexOf()如果没找到则返回-1,找到值返回0,0为false
      if (file.type.indexOf('image/')) {
        this.$toast.fail('请选择图片，不要乱搞')
        return false
      }
      return true
    },
    // 修改昵称,点击确定时触发
    async updatenick () {
      let res = await updateUserInfo(this.id, { nickname: this.nickname })
      if (res.data.message === '修改成功') {
        this.$toast.success('修改成功')
        this.userobj.nickname = this.nickname
      }
    },
    // 修改密码
    async updatepass () {
      if (this.password === this.userobj.password) {
        let pwd = this.$refs.userpwd.$refs.input.value
        let res = await updateUserInfo(this.id, { password: pwd })
        if (res.data.message === '修改成功') {
          this.$toast.success('修改成功')
          this.userobj.password = pwd
        }
      }
    },
    // 判断原密码是否输入正确，关闭弹窗前触发
    // done:关闭时所执行的操作：done():关闭 done(false):不关闭
    // action:当前操作的类型：cancel(取消)  comfirm(确定)
    beforeClose (action, done) {
      if (action === 'confirm' && this.password !== this.userobj.password) {
        this.$toast.success('原密码输入不正确')
        done(false)
      } else {
        done()
      }
    },
    // 获取选择的性别
    async onChange (picker, value, index) {
      console.log(`${picker},当前值：${value}, 当前索引：${index}`)
      this.genderindex = index
    },
    // 修改性别
    async updategender () {
      let res = await updateUserInfo(this.id, { gender: this.genderindex })
      if (res.data.message === '修改成功') {
        this.$toast.success('修改成功')
        this.userobj.gender = this.genderindex
      }
    }
  },
  components: {
    myheader,
    mycell
  },
  async mounted () {
    this.id = this.$route.params.id
    let res = await getUserInfoById(this.id)
    // console.log(res)
    if (res.data.message === '获取成功') {
      this.userobj = res.data.data
      this.userobj.head_img = this.userobj.head_img
        ? localStorage.getItem('heima_39_baseurl') + this.userobj.head_img
        : './avatar.jpg'
    }
  }
}
</script>

<style lang='less' scoped>
.info {
  background-color: #fff;
  .userimg {
    padding: 30px 0;
    text-align: center;
    position: relative;
    > img {
      width: 70/360 * 100vw;
      height: 70/360 * 100vw;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .van-uploader {
      width: 70px;
      height: 70px;
      position: relative;
      left: 0;
      top: 0;
      opacity: 0;
    }
  }
}
</style>
