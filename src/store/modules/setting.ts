//小仓库 关于layout组件相关配置
import { defineStore } from 'pinia'
const useLayOutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false, //控制菜单折叠收起
      refsh: false, //用于控制刷新效果
    }
  },
})
export default useLayOutSettingStore
