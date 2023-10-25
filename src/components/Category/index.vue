<!-- eslint-disable vue/valid-v-for -->
<!-- eslint-disable vue/no-unused-vars -->
<template>
  <el-card>
    <el-from clear>
      <el-form-item float label="一级分类">
        <el-select
          :disabled="scene === 0 ? false : true"
          v-model="categoryStore.c1Id"
          @change="handler"
        >
          <el-option
            v-for="c1 in categoryStore.c1Arr"
            :label="c1.name"
            :key="c1.id"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item float label="二级分类">
        <el-select
          :disabled="scene === 0 ? false : true"
          @change="handler1"
          v-model="categoryStore.c2Id"
        >
          <el-option
            v-for="c2 in categoryStore.c2Arr"
            :label="c2.name"
            :key="c2.id"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item float label="三级分类">
        <el-select
          :disabled="scene === 0 ? false : true"
          v-model="categoryStore.c3Id"
        >
          <el-option
            v-for="c3 in categoryStore.c3Arr"
            :label="c3.name"
            :key="c3.id"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-from>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useCategoryStore from '@/store/modules/category'
const categoryStore = useCategoryStore()
//当组件挂载时，通知仓库获取分类数据
onMounted(() => {
  categoryStore.getC1()
})
const handler = () => {
  categoryStore.c2Id = ''
  categoryStore.c3Id = ''
  categoryStore.getC2()
}
const handler1 = () => {
  categoryStore.c3Id = ''
  categoryStore.getC3()
}
defineProps(['scene'])
</script>

<style scoped>
[float] {
  float: left;
  margin: 0 25px;
}
[clear]::after {
  content: '';
  display: block;
  clear: both;
}
</style>
