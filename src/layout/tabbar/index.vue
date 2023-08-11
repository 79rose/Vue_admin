<template>
  <div class="tabbar">
    <!--顶部左侧静态  -->
    <!-- 左侧面包屑 -->
    <div class="tabbar_left">
      <BreadCrumb></BreadCrumb>
    </div>
    <div class="tabbar_right">
      <Setting></Setting>
    </div>
  </div>
</template>

<script setup lang="ts">
import BreadCrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
</script>
<script lang="ts">
export default {
  name: 'Tabbar',
}
</script>
<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  background-image: linear-gradient(to right, rgb(243, 239, 239), #e8e8f7);
  .tabbar_left {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }
  .tabbar_right {
    display: flex;
    align-items: center;
  }
}
</style>
