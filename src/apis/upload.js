import axios from '@/utils/myaxios.js'

// 文件上传
export const uploadFile = (file) => {
  return axios({
    url: '/upload',
    method: 'post',
    data: file
  })
}
