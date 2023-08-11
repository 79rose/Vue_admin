//引入所有全局组件
import SvgIcon from './SvgIcon/index.vue'
//引入element-icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const allGloablComponent = { SvgIcon }
//对外暴露一个对象
export default {
  install(app) {
    //注册全局组件
    Object.keys(allGloablComponent).forEach((key: string) => {
      app.component(key, allGloablComponent[key])
    })
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
