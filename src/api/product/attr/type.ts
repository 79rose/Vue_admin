export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

//分类ts类型
export interface CategoryObj {
  id: number | string
  name: string
  category1Id?: number
  category2Id?: number
}

//分类接口返回的数据类型
export interface CategoryResponseData extends ResponseData {
  data: CategoryObj[]
}
//已有属性值对象类型
export interface AttrValue {
  id?: number
  valueName: string
  attrId?: number
  flag: boolean
}
//存储属性值的数组
export type AttrValueList = AttrValue[]
//属性对象
export interface Attr {
  id?: number
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: AttrValueList
}
export type AttrList = Attr[]
//属性接口返回的ts类型
export interface AttrResponseData extends ResponseData {
  data: Attr[]
}
