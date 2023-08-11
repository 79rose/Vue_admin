//创建用户小仓库
import { defineStore } from 'pinia'
//引入路由（常量)
import { constantRoute } from '@/router/routes.ts'
//引入本地持久化
import { SET_TOKEN, GET_TOKEN } from '@/utils/token.ts'
//引入接口
import { reqLogin } from '@/api/user'
//引入数据类型
import type { loginForm, loginResponse } from '@/api/user/type.ts'
import type { UserState } from './type/type.ts'
const useUerStore = defineStore('User', {
  //储存数据
  state: (): UserState => {
    return {
      token: GET_TOKEN(), //用户唯一标识
      menuRoutes: constantRoute, //仓库存储生成菜单需要的数组路由
    }
  },
  //异步 逻辑
  actions: {
    //处理用户登录
    async userLogin(data: loginForm) {
      const result: loginResponse = await reqLogin(data)
      //成功200
      if (result.code === 200) {
        this.token = result.data.token as string
        SET_TOKEN(result.data.token as string)
        //返回成功 Promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
  },
  getters: {},
})

export default useUerStore
