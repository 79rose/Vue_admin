<template>
  <div>
    <!-- 三级分类 -->
    <category :scene="scene"></category>
    <!-- 卡片 -->
    <el-card style="margin: 15px 0">
      <div v-show="scene === 0">
        <el-button
          size="default"
          icon="Plus"
          type="primary"
          :disabled="categoryStore.c3Id ? false : true"
          @click="addSpu"
        >
          添加SPU
        </el-button>
        <el-table
          style="margin: 15px 0"
          border
          width="100%"
          :data="records"
          show-overflow-tooltip
        >
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column label="SPU描述" prop="description"></el-table-column>
          <el-table-column label="操作">
            <template #="{ row, $index }">
              <el-button
                size="small"
                type="primary"
                icon="Plus"
                title="添加sku"
              ></el-button>
              <el-button
                size="small"
                type="primary"
                icon="Edit"
                title="修改spu"
                @click="updateSpu(row)"
              ></el-button>
              <el-button
                size="small"
                type="primary"
                icon="View"
                title="查看spu列表"
              ></el-button>
              <el-button
                size="small"
                type="primary"
                icon="Delete"
                title="删除spu"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[3, 5, 7]"
          :background="true"
          layout="prev, pager, next, jumper, ->, sizes, total"
          :total="total"
          @current-change="getHasSpu"
          @size-change="getHasSpu(1)"
        />
      </div>
      <spuForm
        ref="SpuForm"
        v-show="scene === 1"
        @changeScene="changeScene"
      ></spuForm>
      <skuForm v-show="scene === 2"></skuForm>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type { SpuData } from '@/api/product/spu/type'
import spuForm from './spuForm.vue'
import skuForm from './skuForm.vue'
import type { HasSpuResponseData, Records } from '@/api/product/spu/type'
import { ref, watch, onBeforeMount } from 'vue'
import useCategoryStore from '@/store/modules/category'
import { reqHasSpu } from '@/api/product/spu'
let SpuForm = ref()
const categoryStore = useCategoryStore()
let scene = ref<number>(0) //0显示已有spu 1 添加修改spu 2 添加sku
let currentPage = ref<number>(1)
let pageSize = ref<number>(3)
let records = ref<Records>([])
let total = ref<number>(0)
const changeScene = (num: number) => {
  scene.value = num
}
const updateSpu = (row: SpuData) => {
  scene.value = 1
  SpuForm.value.initHasSpuData(row)
}
const addSpu = () => {
  scene.value = 1
}
onBeforeMount(() => {
  categoryStore.$reset()
})
//监听三级分类id变化
watch(
  () => categoryStore.c3Id,
  () => {
    if (!categoryStore.c3Id) return
    getHasSpu()
  },
)
const getHasSpu = async (page = 1) => {
  currentPage.value = page
  const res: HasSpuResponseData = await reqHasSpu(
    currentPage.value,
    pageSize.value,
    categoryStore.c3Id,
  )
  if (res.code === 200) {
    records.value = res.data.records
    total.value = res.data.total
  }
}
</script>

<style scoped></style>
