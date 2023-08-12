//统一管理用户相关接口
import request from '@/utils/request.ts'
import type {
  LoginFormData,
  loginRespondeData,
  userInfoResponseData,
} from './type'
// 项目用户相关请求地址
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINGO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

//登录接口
export const reqLogin = (data: LoginFormData) =>
  request.post<any, loginRespondeData>(API.LOGIN_URL, data)
//获取用户信息
export const reqUserInfo = () =>
  request.get<any, userInfoResponseData>(API.USERINGO_URL)
//退出登录接口
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
