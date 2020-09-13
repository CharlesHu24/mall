import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: '127.0.0.1', // 接口地址请添加微信:coderwhy001
    timeout: 5000
  })

  instance.interceptors.request.use(config => {
    return config
  }, error => {

  })

  instance.interceptors.response.use(results => {
    return results.data
  }, error => {

  })

  return instance(config)
}
