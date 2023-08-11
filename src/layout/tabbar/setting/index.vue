<template>
  <el-button size="small" circle icon="Refresh" @click="updateRefsh" />
  <el-button
    size="small"
    circle
    icon="FullScreen"
    @click="fullScreen"
  ></el-button>
  <el-button size="small" icon="Setting" circle></el-button>
  <img src="" style="width: 24px; margin: 0px 10px" />
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      admin
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
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
</script>
<script lang="ts">
export default {
  name: 'Setting',
}
</script>

<style scoped></style>
