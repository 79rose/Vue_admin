//品牌管理 接口
import request from '@/utils/request'
import type { TradeMarkResponsedata, TradeMark } from './type'
//品牌接口地址
enum API {
  // 已有品牌接口
  TRADMARK_URL = '/admin/product/baseTrademark/',
  // 新增品牌接口
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  // 修改品牌接口
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
  DELETE_URL = '/admin/product/baseTrademark/remove/',
}
//获取已有品牌的接口方法
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponsedata>(API.TRADMARK_URL + `${page}/${limit}`)

//添加与修改已有品牌的方法
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
  //修改
  if (data.id) {
    return request.put<any, TradeMark>(API.UPDATETRADEMARK_URL, data)
  } else {
    //新增
    return request.post<any, TradeMark>(API.ADDTRADEMARK_URL, data)
  }
}

//删除已有品牌
export const reqDeleteTrademark = (id: number) =>
  request.delete<any, any>(API.DELETE_URL + id)
