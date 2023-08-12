//进行axios二次封装：使用请求和相应拦截器
import axios from 'axios'
import { ElMessage } from 'element-plus'
//引入用户相关仓库
import useUserStore from '@/store/modules/user.ts'
//创建axios实例（其他配置：基础路径，超时时间，）
const request = axios.create({
  //基础路径
  baseURL: import.meta.env.VITE_APP_BASE_API, //基础路径上会携带/api
  timeout: 5000,
})
//请求拦截器
request.interceptors.request.use((config) => {
  //config配置对象 header请求头 经常给服务器携带公共参数
  //返回配置对象
  //获取用户相关 Token 登录成功之后 携带给服务器
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers.token = userStore.token
  }
  return config
})
//响应拦截器
request.interceptors.response.use(
  (response) => {
    //成功回调
    //简化数据
    return response.data
  },
  (error) => {
    //失败回调：处理http网络错误
    let message = ''
    const Status = error.response.status
    switch (Status) {
      case 401:
        message = 'TOKEN过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = '网络出现问题'
        break
    }
    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(error)
  },
)
export default request
