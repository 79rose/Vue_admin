<template>
  <el-button size="small" circle icon="Refresh" @click="updateRefsh" />
  <el-button
    size="small"
    circle
    icon="FullScreen"
    @click="fullScreen"
  ></el-button>
  <el-popover placement="bottom" title="主题设置" :width="300" trigger="hover">
    <el-form class="form">
      <el-form-item label="主题颜色">
        <el-color-picker
          v-model="color"
          show-alpha
          :predefine="predefineColors"
          @change="Colorchange"
        />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch
          v-model="value"
          active-icon="MoonNight"
          inactive-icon="Sunny"
          inline-prompt
          @change="theme"
        />
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button size="small" icon="Setting" circle></el-button>
    </template>
  </el-popover>

  <img
    :src="userStore.avatar"
    style="border-radius: 50%; width: 27px; height: 27px; margin: 0px 10px"
  />
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
//获取用户小仓库
import useUserStore from '@/store/modules/user.ts'
import { ref } from 'vue'
import useLayOutSettingStore from '@/store/modules/setting.ts'
let value = ref(false)
const color = ref('rgba(255, 69, 0, 0.68)')
const Colorchange = () => {
  const el = document.documentElement
  // const el = document.getElementById('xxx')
  // 设置 css 变量
  el.style.setProperty('--el-color-primary', color.value)
  // el.style.setProperty('--color', color.value)
}
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
const theme = () => {
  let html = document.documentElement
  if (html.classList.contains('dark')) {
    html.classList.remove('dark')
    value.value = false
  } else {
    html.classList.add('dark')
    value.value = true
  }
}
//获取layout小仓库
const LayOutSettingStore = useLayOutSettingStore()

//刷新按钮点击回调
const updateRefsh = () => {
  LayOutSettingStore.refsh = !LayOutSettingStore.refsh
}

//全屏按钮
const fullScreen = () => {
  //判断是否全屏
  let full = document.fullscreenElement
  console.log(full)
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
const userStore = useUserStore()
//路由器对象
const $router = useRouter()
//路由对象
const $route = useRoute()
//退出登录
const logout = async () => {
  //发请求
  await userStore.userLogout()
  //跳转登录
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>
<script lang="ts">
export default {
  name: 'Setting',
}
</script>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  justify-items: center;
  & {
    margin: 0 10px;
  }
}
</style>
