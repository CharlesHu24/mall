import axios from 'axios'



export function request(config) {
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000/api/h8',
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
