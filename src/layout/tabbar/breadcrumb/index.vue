<template>
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="LayOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <el-breadcrumb :separator-icon="ArrowRight">
    <!-- 面包屑动态展现路由名字与标题 -->
    <el-breadcrumb-item
      v-for="(item, index) in $router.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <el-icon style="margin: 0px 3px">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'
// import { ref } from 'vue'
import useLayOutSettingStore from '@/store/modules/setting.ts'
//获取layout配置相关仓库
let LayOutSettingStore = useLayOutSettingStore()
const changeIcon = () => {
  LayOutSettingStore.fold = !LayOutSettingStore.fold
}
//获取路由
const $router = useRoute()
</script>
<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>
<style scoped></style>
