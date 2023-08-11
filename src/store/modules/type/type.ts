import type { RouteRecordRaw } from 'vue-router'
//定义小仓库 state类型
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
}
