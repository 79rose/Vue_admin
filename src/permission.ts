//路由鉴权 路由能否被访问
import router from '@/router'
// 进度条颜色
import nprogress from 'nprogress'
//获取用户小仓库 token 判断是否登录
import useUerStore from './store/modules/user'
import pinia from '@/store/index.ts'
import setting from './setting.ts'
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })
const userStore = useUerStore(pinia)
//全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  nprogress.start()
  //获取token 判断是否登录
  const token = userStore.token
  const username = userStore.username
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (username) {
        next()
      } else {
        //没用户信息 发请求获取用户信息
        try {
          await userStore.userInfo()
          next()
        } catch (error) {
          //token过期
          //用户手动修改token
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})
//全局后置守卫
router.afterEach((to: any, from: any) => {
  document.title = `${setting.title}-${to.meta.title}`
  nprogress.done()
})
