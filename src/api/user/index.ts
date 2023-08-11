//统一管理用户相关接口
import request from '@/utils/request.ts'
import type { loginForm, loginResponse, userResponseData } from './type'
//统一管理接口
enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/ingo',
}
//暴露请求函数
export const reqLogin = (data: loginForm) =>
  request.post<any, loginResponse>(API.LOGIN_URL, data)
export const reqUserInfo = () =>
  request.get<any, userResponseData>(API.USERINFO_URL)
