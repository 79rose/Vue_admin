import { createApp } from 'vue'
import App from '@/App.vue'
//svg 配置代码
import 'virtual:svg-icons-register'
import 'element-plus/theme-chalk/dark/css-vars.css'
//引入仓库
import pinia from '@/store/index.ts'
//引入element-plus插件与样式
import ElementPlus from 'element-plus'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
//引入自定义插件对象：注册全局组件、
import gloalComponent from '@/components/index.ts'
//引入路由
import router from '@/router/index.ts'
//获取应用实例对象
const app = createApp(App)
app.use(pinia)
app.use(router)
//安装element-plus
//配置国际化
app.use(ElementPlus, {
  locale: zhCn,
})

app.use(gloalComponent)
//引入全局样式
import '@/styles/index.scss'
//引入路由鉴权
import './permission.ts'
//应用挂载
app.mount('#app')
// console.log(import.meta.env)获取环境变量
