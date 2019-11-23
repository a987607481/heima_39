import axios from '@/utils/myaxios.js'

// 登录
export const login = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}
// 注册
export const register = (data) => {
  return axios({
    method: 'post',
    url: '/register',
    data
  })
}

// 根据id获取用户数据
export const getUserInfoById = (id) => {
  return axios({
    // 拦截器代做了这一步
    // headers: {
    //   Authorization: localStorage.getItem('heima_39_Authorization')
    // },
    url: `/user/${id}`
  })
}
// 根据id修改用户数据
export const updateUserInfo = (id, data) => {
  return axios({
    method: 'post',
    url: `/user_update/${id}`,
    data
  })
}

// 关注
export const focusUser = (id) => {
  return axios({
    url: `/user_follows/${id}`
  })
}

// 取消关注
export const unfocusUser = (id) => {
  return axios({
    url: `/user_unfollow/${id}`
  })
}

// 获取用户关注列表
export const getUserFocus = () => {
  return axios({
    url: `/user_follows`
  })
}

// 获取用户收藏列表
export const getUserStars = () => {
  return axios({
    url: `/user_star`
  })
}
