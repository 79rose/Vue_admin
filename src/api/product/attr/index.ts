//书写属性相关
import request from '@/utils/request'
import type { CategoryResponseData, AttrResponseData, Attr } from './type'
enum API {
  C1_URL = '/admin/product/getCategory1',
  C2_URL = '/admin/product/getCategory2/',
  C3_URL = '/admin/product/getCategory3/',
  //获取已有商品
  ATTR_URL = '/admin/product/attrInfoList/',
  ADDORUPDATE_URL = '/admin/product/saveAttrInfo',
  //删除某一个已有属性
  DELETEATTR_URL = '/admin/product/deleteAttr/',
}

export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)
export const reqC2 = (cid: number | string) =>
  request.get<any, CategoryResponseData>(API.C2_URL + cid)
export const reqC3 = (cid: number | string) =>
  request.get<any, CategoryResponseData>(API.C3_URL + cid)
export const reqAttr = (
  category1Id: string | number,
  category2Id: string | number,
  category3Id: string | number,
) =>
  request.get<any, AttrResponseData>(
    `${API.ATTR_URL}\\${category1Id}\\${category2Id}\\${category3Id}`,
  )
export const reqAddOrUpdateAttr = (data: Attr) =>
  request.post<any, any>(API.ADDORUPDATE_URL, data)
export const reqRemoveAttr = (attrId: number | string) =>
  request.delete<any, any>(API.DELETEATTR_URL + attrId)
