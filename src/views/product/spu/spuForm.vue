<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input placeholder="请输入名称"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select>
        <el-option>huawei</el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input type="textarea" placeholder="请你输入描述"></el-input>
    </el-form-item>
    <el-form-item label="SPU图片">
      <el-upload
        v-model:file-list="fileList"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-select></el-select>
      <el-button type="primary" icon="Plus" style="margin-left: 15px">
        添加属性值
      </el-button>
      <el-table style="margin: 10px 0" border>
        <el-table-column
          label="序号"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column label="销售属性名字" width="150px"></el-table-column>
        <el-table-column label="销售属性值"></el-table-column>
        <el-table-column label="操作" width="150px"></el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button type="primary" @click="$emit('changeScene', 0)">
        取消
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import type {
  SpuData,
  AllTradeMark,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
} from '@/api/product/spu/type'
import {
  reqAllSaleAttr,
  reqSpuTmageList,
  reqAllTrademark,
  reqSpuHasSaleAttr,
} from '@/api/product/spu'
import { ref } from 'vue'
const $emit = defineEmits(['changeScene'])
let AlltradeMark: AllTradeMark = ref<AllTradeMark>([])
const initHasSpuData = async (row: SpuData) => {
  const res: AllTradeMark = await reqAllTrademark()
  AlltradeMark.value = res
  const res1: SpuHasImg = await reqSpuTmageList(row.id)
  const res2: SaleAttrResponseData = await reqSpuHasSaleAttr(row.id as number)
  const res3: HasSaleAttrResponseData = await reqAllSaleAttr()
  console.log(res3)
}
defineExpose({ initHasSpuData })
</script>

<style scoped></style>
