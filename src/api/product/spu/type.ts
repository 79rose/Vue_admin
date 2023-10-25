import { type TradeMark } from '@/api/product/trademark/type.ts'
export interface AllTradeMark extends ResponseData {
  data: TradeMark[]
}
//全部接口返回的数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
//spu数据类型
export interface SpuData {
  id?: number
  spuName: string
  description: string
  category3Id: string | number
  tmId: number | string
  spuSaleAttrList: null | SaleAttr[]
  spuImageList: null | SpuImg[]
}
// 数组 元素都是已有spu数据类型
export type Records = SpuData[]

//定义获取已有spu接口返回的
export interface HasSpuResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    current: number
    searchCount: boolean
    pages: number
  }
}
export interface SpuImg {
  id?: number
  createTime?: string
  updateTime?: string
  spuId?: number
  imgName: string
  imgUrl: string
}
export interface SpuHasImg extends ResponseData {
  data: SpuImg[]
}
export interface SaleAttrValue {
  id?: number
  spuId?: number
  baseSaleAttrId: number
  saleAttrName?: string
  ischecked?: null
  createTime?: null
  updateTime?: null
}
export type spuSaleAttrValueList = SaleAttrValue[]
export interface SaleAttr {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number
  saleAttrName: string
  spuSaleAttrValueList: spuSaleAttrValueList
}
export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[]
}
export interface HasAttr {
  id: number
  name: string
}
export interface HasSaleAttrResponseData extends ResponseData {
  data: HasAttr[]
}
