//创建用户小仓库
import { defineStore } from 'pinia'
//引入路由（常量)
import { constantRoute } from '@/router/routes.ts'
//引入本地持久化
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKREN } from '@/utils/token.ts'
//引入接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
import type { UserState } from './type/type.ts'
import type {
  LoginFormData,
  loginRespondeData,
  userInfoResponseData,
} from '@/api/user/type.ts'
const useUerStore = defineStore('User', {
  //储存数据
  state: (): UserState => {
    return {
      token: GET_TOKEN(), //用户唯一标识
      menuRoutes: constantRoute, //仓库存储生成菜单需要的数组路由
      username: '', //用户名
      avatar: '', //用户头像
    }
  },
  //异步 逻辑
  actions: {
    //处理用户登录
    async userLogin(data: LoginFormData) {
      const result: loginRespondeData = await reqLogin(data)
      //成功200
      if (result.code === 200) {
        this.token = result.data as string
        SET_TOKEN(result.data as string)
        //返回成功 Promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },
    //获取用户信息
    async userInfo() {
      //获取用户信息存储仓库当中(头像 名字)
      const result: userInfoResponseData = await reqUserInfo()
      if (result.code === 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //退出登录
    async userLogout() {
      const res: any = await reqLogout()
      if (res.code === 200) {
        this.token = ''
        this.avatar = ''
        this.username = ''
        REMOVE_TOKREN()
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
  },
  getters: {},
})

export default useUerStore
