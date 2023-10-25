//定义用户相关数据ts类型
//用户登录接口携带参数
export interface LoginFormData {
  username: string
  password: string
}

//全部接口返回的公共数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

//登录接口返回的数据类型
export interface loginRespondeData extends ResponseData {
  data: string
}

//获取用户信息返回的数据类型
export interface userInfoResponseData extends ResponseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}

// interface test {
//   [propName: string]: any
// }

// const test1: test = {
//   nihao: 1,
// }
