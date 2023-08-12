<template>
  <el-button size="small" circle icon="Refresh" @click="updateRefsh" />
  <el-button
    size="small"
    circle
    icon="FullScreen"
    @click="fullScreen"
  ></el-button>
  <el-button size="small" icon="Setting" circle></el-button>
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
//获取layout小仓库
import useLayOutSettingStore from '@/store/modules/setting.ts'
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

<style scoped></style>
