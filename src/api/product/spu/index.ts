import request from '@/utils/request'
import type {
  HasSpuResponseData,
  AllTradeMark,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
} from '@/api/product/spu/type.ts'
enum API {
  HASSPU_URL = '/admin/product/',
  //获取全部品牌
  ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  TMAGE_URL = '/admin/product/spuImageList/',
  SPUHASALEATTR_URL = '/admin/product/spuSaleAttrList/',
  ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
  ADDSPU_URL = '/admin/product/saveSpuInfo',
  UPDATESPU_URL = '/admin/product/updateSpuInfo',
}
export const reqAllTrademark = () =>
  request.get<any, AllTradeMark>(API.ALLTRADEMARK_URL)
export const reqHasSpu = (
  page: number,
  limit: number,
  category3Id: string | number,
) =>
  request.get<any, HasSpuResponseData>(
    API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`,
  )
export const reqSpuTmageList = (spuId: number | undefined) =>
  request.get<any, SpuHasImg>(API.TMAGE_URL + spuId)

export const reqSpuHasSaleAttr = (spuId: number) =>
  request.get<any, SaleAttrResponseData>(API.SPUHASALEATTR_URL + spuId)
export const reqAllSaleAttr = () =>
  request.get<any, HasSaleAttrResponseData>(API.ALLSALEATTR_URL)
export const reqAddOrUpdateSpu = (data: any) => {
  if (data.id) {
    return request.post<any, any>(API.UPDATESPU_URL, data)
  } else {
    return request.post<any, any>(API.ADDSPU_URL, data)
  }
}
