<template>
  <div class="logo" v-if="!setting.logoHidden">
    <img :src="setting.logo" alt="logo" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
//引入设置标题 logo
import setting from '@/setting.ts'
</script>
<script lang="ts">
export default {
  name: 'Logo',
}
</script>
<style scoped lang="scss">
.logo {
  height: $base-menu-logo-height;
  width: 100%;
  color: white;
  display: flex;
  align-items: center;
  padding: 8px;
  img {
    width: 40px;
    height: 40px;
  }
  p {
    margin-left: 10px;
    font-size: $base-menu-title-fontsize;
  }
}
</style>
