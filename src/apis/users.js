import axios from '@/utils/myaxios.js'

export const login = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}
export const register = (data) => {
  return axios({
    method: 'post',
    url: '/register',
    data
  })
}

export const getUserInfoById = (id) => {
  return axios({
    // 拦截器代做了这一步
    // headers: {
    //   Authorization: localStorage.getItem('heima_39_Authorization')
    // },
    url: `/user/${id}`
  })
}
