// vite.config.ts
import {
  defineConfig,
  loadEnv,
} from 'file:///D:/Marketplace_Back-End_Management/vue_admin/node_modules/.pnpm/registry.npmmirror.com+vite@4.4.5_@types+node@20.4.5_sass@1.64.1/node_modules/vite/dist/node/index.js'
import path from 'path'
import vue from 'file:///D:/Marketplace_Back-End_Management/vue_admin/node_modules/.pnpm/registry.npmmirror.com+@vitejs+plugin-vue@4.2.3_vite@4.4.5_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs'
import { viteMockServe } from 'file:///D:/Marketplace_Back-End_Management/vue_admin/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-mock@3.0.0_esbuild@0.18.17_mockjs@1.1.0_vite@4.4.5/node_modules/vite-plugin-mock/dist/index.mjs'
import { createSvgIconsPlugin } from 'file:///D:/Marketplace_Back-End_Management/vue_admin/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-svg-icons@2.0.1_vite@4.4.5/node_modules/vite-plugin-svg-icons/dist/index.mjs'
let vite_config_default = defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      viteMockServe({
        localEnabled: command === 'serve',
        //保障开发阶段可以使用mock接口
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
        // 相对路径别名配置，使用 @ 代替 src
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
    //代理跨域
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          //获取数据服务器地址
          target: env.VITE_SERVE,
          //是否代理跨域
          changeOrigin: true,
          //路径从写
          rewrite: (path2) => path2.replace(/^\/api/, ''),
        },
      },
    },
  }
})
export { vite_config_default as default }
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxNYXJrZXRwbGFjZV9CYWNrLUVuZF9NYW5hZ2VtZW50XFxcXHZ1ZV9hZG1pblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcTWFya2V0cGxhY2VfQmFjay1FbmRfTWFuYWdlbWVudFxcXFx2dWVfYWRtaW5cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L01hcmtldHBsYWNlX0JhY2stRW5kX01hbmFnZW1lbnQvdnVlX2FkbWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbi8vbW9ja1x1NjNEMlx1NEVGNlx1NjNEMFx1NEY5Qlx1NjVCOVx1NkNENVxyXG5pbXBvcnQgeyB2aXRlTW9ja1NlcnZlIH0gZnJvbSAndml0ZS1wbHVnaW4tbW9jaydcclxuLy9cdTVGMTVcdTUxNjVzdmdcclxuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCwgbW9kZSB9KSA9PiB7XHJcbiAgLy9cdTgzQjdcdTUzRDZcdTU0MDRcdTRFMkFcdTczQUZcdTU4ODNcdTRFMEJcdTVCRjlcdTVFOTRcdTc2ODRcdTUzRDhcdTkxQ0ZcclxuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpXHJcbiAgcmV0dXJuIHtcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgdnVlKCksXHJcbiAgICAgICh2aXRlTW9ja1NlcnZlIGFzIGFueSkoe1xyXG4gICAgICAgIGxvY2FsRW5hYmxlZDogY29tbWFuZCA9PT0gJ3NlcnZlJywgLy9cdTRGRERcdTk2OUNcdTVGMDBcdTUzRDFcdTk2MzZcdTZCQjVcdTUzRUZcdTRFRTVcdTRGN0ZcdTc1Mjhtb2NrXHU2M0E1XHU1M0UzXHJcbiAgICAgIH0pLFxyXG4gICAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XHJcbiAgICAgICAgaWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9hc3NldHMvaWNvbnMnKV0sXHJcbiAgICAgICAgc3ltYm9sSWQ6ICdpY29uLVtkaXJdLVtuYW1lXScsXHJcbiAgICAgIH0pLFxyXG4gICAgXSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZSgnLi9zcmMnKSwgLy8gXHU3NkY4XHU1QkY5XHU4REVGXHU1Rjg0XHU1MjJCXHU1NDBEXHU5MTREXHU3RjZFXHVGRjBDXHU0RjdGXHU3NTI4IEAgXHU0RUUzXHU2NkZGIHNyY1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIC8vc2Nzc1x1NTE2OFx1NUM0MFx1NTNEOFx1OTFDRlxyXG4gICAgY3NzOiB7XHJcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgICBzY3NzOiB7XHJcbiAgICAgICAgICBqYXZhc2NyaXB0RW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgIGFkZGl0aW9uYWxEYXRhOiAnQGltcG9ydCBcIi4vc3JjL3N0eWxlcy92YXJpYWJsZS5zY3NzXCI7JyxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIC8vXHU0RUUzXHU3NDA2XHU4REU4XHU1N0RGXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgcHJveHk6IHtcclxuICAgICAgICBbZW52LlZJVEVfQVBQX0JBU0VfQVBJXToge1xyXG4gICAgICAgICAgLy9cdTgzQjdcdTUzRDZcdTY1NzBcdTYzNkVcdTY3MERcdTUyQTFcdTU2NjhcdTU3MzBcdTU3NDBcclxuICAgICAgICAgIHRhcmdldDogZW52LlZJVEVfU0VSVkUsXHJcbiAgICAgICAgICAvL1x1NjYyRlx1NTQyNlx1NEVFM1x1NzQwNlx1OERFOFx1NTdERlxyXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgICAgLy9cdThERUZcdTVGODRcdTRFQ0VcdTUxOTlcclxuICAgICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCAnJyksXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfVxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRULFNBQVMsY0FBYyxlQUFlO0FBQ2xXLE9BQU8sVUFBVTtBQUNqQixPQUFPLFNBQVM7QUFFaEIsU0FBUyxxQkFBcUI7QUFFOUIsU0FBUyw0QkFBNEI7QUFHckMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxTQUFTLEtBQUssTUFBTTtBQUVqRCxRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDO0FBQ3ZDLFNBQU87QUFBQSxJQUNMLFNBQVM7QUFBQSxNQUNQLElBQUk7QUFBQSxNQUNILGNBQXNCO0FBQUEsUUFDckIsY0FBYyxZQUFZO0FBQUE7QUFBQSxNQUM1QixDQUFDO0FBQUEsTUFDRCxxQkFBcUI7QUFBQSxRQUNuQixVQUFVLENBQUMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLGtCQUFrQixDQUFDO0FBQUEsUUFDMUQsVUFBVTtBQUFBLE1BQ1osQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssS0FBSyxRQUFRLE9BQU87QUFBQTtBQUFBLE1BQzNCO0FBQUEsSUFDRjtBQUFBO0FBQUEsSUFFQSxLQUFLO0FBQUEsTUFDSCxxQkFBcUI7QUFBQSxRQUNuQixNQUFNO0FBQUEsVUFDSixtQkFBbUI7QUFBQSxVQUNuQixnQkFBZ0I7QUFBQSxRQUNsQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUVBLFFBQVE7QUFBQSxNQUNOLE9BQU87QUFBQSxRQUNMLENBQUMsSUFBSSxpQkFBaUIsR0FBRztBQUFBO0FBQUEsVUFFdkIsUUFBUSxJQUFJO0FBQUE7QUFBQSxVQUVaLGNBQWM7QUFBQTtBQUFBLFVBRWQsU0FBUyxDQUFDQSxVQUFTQSxNQUFLLFFBQVEsVUFBVSxFQUFFO0FBQUEsUUFDOUM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJwYXRoIl0KfQo=
