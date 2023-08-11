<template>
  <div>
    <svg :style="{ width, height }">
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps({
  //x-link：href前缀
  prefix: {
    type: String,
    default: '#icon-',
  },
  //图标名字 颜色
  name: String,
  color: {
    type: String,
    default: '',
  },
  //接受宽度
  width: {
    type: String,
    default: '16px',
  },
  //接受高度
  height: {
    type: String,
    default: '16px',
  },
})
</script>

<style scoped></style>
