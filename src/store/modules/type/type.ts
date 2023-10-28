import type { RouteRecordRaw } from 'vue-router'
import type { CategoryObj } from '@/api/product/attr/type'
//定义小仓库 state类型
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
  buttons: string[]
}
//定义分类仓库state类型
export interface CategoryState {
  c1Arr: CategoryObj[]
  c1Id: number | string
  c2Arr: CategoryObj[]
  c2Id: number | string
  c3Arr: CategoryObj[]
  c3Id: number | string
}
