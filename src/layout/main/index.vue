<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- 渲染layout以及路由子路由 -->
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { watch, ref, nextTick } from 'vue'
import useLayOutSettingStore from '@/store/modules/setting.ts'
const LayOutSettingStore = useLayOutSettingStore()
watch(
  () => LayOutSettingStore.refsh,
  () => {
    //点击 刷新 路由组件销毁
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
//控制当前组件是否销毁重建
let flag = ref(true)
</script>
<script lang="ts">
export default {
  name: 'Main',
}
</script>
<style scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 0.3s linear;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
