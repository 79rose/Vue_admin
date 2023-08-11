//登录接口需要的参数类型
export interface loginForm {
  username: string
  password: string
}
//登录接口返回的数据类型
interface dataType {
  token?: string
  message?: string
}
export interface loginResponse {
  code: number
  data: dataType
}
//定义服务器返回用户信息的数据类型
interface ueserInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}
interface user {
  checkUser: ueserInfo
}
export interface userResponseData {
  code: number
  data: user
}
