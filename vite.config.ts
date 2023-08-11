import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
//mock插件提供方法
import { viteMockServe } from 'vite-plugin-mock'
//引入svg
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [
      vue(),
      (viteMockServe as any)({
        localEnabled: command === 'serve', //保障开发阶段可以使用mock接口
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
      },
    },
    //scss全局变量
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
  }
})
