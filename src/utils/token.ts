//封装本地存储数据
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('TOKEN', token) //持久化
}
//本地读取数据的方法
export const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN')
}

//本地删除数据
export const REMOVE_TOKREN = () => {
  return localStorage.removeItem('TOKEN')
}
