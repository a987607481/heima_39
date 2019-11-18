import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login.vue'
import Register from '@/views/register.vue'
import PersonalCenter from '@/views/personalCenter.vue'

Vue.use(VueRouter)

var router = new VueRouter({
  routes: [
    {
      name: 'Login',
      path: '/login',
      component: Login
    },
    {
      name: 'Register',
      path: '/register',
      component: Register
    },
    {
      name: 'PersonalCenter',
      path: '/personal/:id',
      component: PersonalCenter
    }
  ]
})

// 添加导航守卫
router.beforeEach((to, from, next) => {
  if (to.path.indexOf('/personal/') === 0) {
    let token = localStorage.getItem('heima_39_Authorization')
    if (token) {
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

export default router
