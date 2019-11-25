// 引入axios
import axios from '@/utils/myaxios.js'

// 获取当前栏目的的新闻数据
export const getArticleList = (params) => {
  return axios({
    url: '/post',
    params
  })
}

// 根据文章id获取文章详情
export const getArticleById = (id) => {
  return axios({
    url: `/post/${id}`
  })
}
// 文章点赞
export const likeArticle = (id) => {
  return axios({
    url: `/post_like/${id}`
  })
}

// 收藏文章
export const startThisArticle = (id) => {
  return axios({
    url: `/post_star/${id}`
  })
}

// 获取文件评论数据
export const getArticleComments = (id) => {
  return axios({
    url: `/post_comment/${id}`
  })
}

// 发表评论
export const publishComment = (id, data) => {
  return axios({
    method: 'post',
    url: `/post_comment/${id}`,
    data
  })
}
