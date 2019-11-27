import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login.vue'
import Register from '@/views/register.vue'
import PersonalCenter from '@/views/personalCenter.vue'
import EditPersonal from '@/views/editPersonal.vue'
import Index from '@/views/index.vue'
import ArticleDeatil from '@/views/articleDeatil.vue'
import Myfocus from '@/views/myfocus.vue'
import Mystars from '@/views/mystars.vue'
import Comments from '@/views/comments.vue'
import Search from '@/views/search.vue'

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
    },
    {
      name: 'EditPersonal',
      path: '/editPersonal/:id',
      component: EditPersonal
    },
    {
      name: 'Index',
      path: '/index',
      component: Index
    },
    {
      name: 'default',
      path: '/',
      redirect: { name: 'Index' }
    },
    {
      name: 'ArticleDeatil',
      path: '/articleDeatil/:id',
      component: ArticleDeatil
    },
    {
      name: 'Myfocus',
      path: '/myfocus',
      component: Myfocus
    },
    {
      name: 'Mystars',
      path: '/mystars',
      component: Mystars
    },
    {
      name: 'Comments',
      path: '/comments/:id',
      component: Comments
    },
    {
      name: 'Search',
      path: '/search',
      component: Search
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
