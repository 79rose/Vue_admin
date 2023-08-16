export interface Responsedata {
  message: string
  code: number
  ok: boolean
}

//已有品牌数据类型
export interface TradeMark {
  id?: number
  tmName: string
  logoUrl: string
}
//包含全部品牌数据类型
export type Records = TradeMark[]

//获取的已有的全部品牌数据类型
export interface TradeMarkResponsedata extends Responsedata {
  data: {
    records: Records
    total: number
    current: number
    searchCount: boolean
    pages: number
  }
}
