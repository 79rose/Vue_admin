<template>
  <el-card style="height: 80px; margin-bottom: 8px">
    <el-form :inline="true" class="form">
      <el-form-item label="用户名">
        <el-input placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-from-item>
        <el-button type="primary"></el-button>
        <el-button></el-button>
      </el-from-item>
    </el-form>
  </el-card>
  <el-card>
    <el-button type="primary">添加</el-button>
    <el-button>批量删除</el-button>
    <el-table border>
      <el-table-column type="selection" align="center" />
      <el-table-column label="#" align="center"></el-table-column>
      <el-table-column label="ID" align="center"></el-table-column>
      <el-table-column label="用户名字"></el-table-column>
      <el-table-column label="用户名称"></el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="260px"
      ></el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 7, 9]"
      :background="true"
      layout="prev, pager, next, jumper, -> ,sizes, total"
      :total="total"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
let currentPage = ref<number>(1)
let pageSize = ref<number>(5)
let total = ref<number>(100)
</script>

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  // height: 50px;
}
</style>
