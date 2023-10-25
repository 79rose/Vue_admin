<!-- eslint-disable vue/valid-attribute-name -->
<!-- eslint-disable vue/no-unused-vars -->
<template>
  <div>
    <Category :scene="scene"></Category>
    <el-card style="margin: 12px 0">
      <div v-show="scene === 0">
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="categoryStore.c3Id ? false : true"
          icon-color="red"
          @click="addAttr"
        >
          添加属性
        </el-button>
        <el-table border style="margin: 11px 0" :data="attrArr">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            min-width="10%"
          ></el-table-column>
          <el-table-column label="属性名称" type="index" min-width="20%">
            <template #="{ row }">
              {{ row.attrName }}
            </template>
          </el-table-column>
          <el-table-column label="属性值名称" type="index" min-width="55%">
            <template #="{ row }">
              <el-tag
                style="margin: 0px 4px"
                v-for="item in row.attrValueList"
                :key="item.id"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            type="index"
            align="center"
            min-width="15%"
          >
            <template #="{ row }">
              <el-button
                size="small"
                icon="Edit"
                type="primary"
                @click="updateAttr(row)"
              ></el-button>
              <el-popconfirm title="确定删除吗?" @confirm="deleteAttr(row.id)">
                <template #reference>
                  <el-button
                    size="small"
                    icon="Delete"
                    type="danger"
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene === 1">
        <!-- 展示添加修改属性 -->
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input
              placeholder="请输入属性名称"
              v-model="attrParams.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          :disabled="attrParams.attrName ? false : true"
          icon="Plus"
          type="primary"
          size="small"
          @click="addAttrValue"
        >
          添加属性值
        </el-button>
        <el-button size="small" @click="cancel">取消</el-button>
        <el-table
          border
          style="margin: 10px 0"
          :data="attrParams.attrValueList"
        >
          <el-table-column
            width="80px"
            type="index"
            align="center"
            label="序号"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row, $index }">
              <el-input
                :ref="(vc: any) => (inputArr[$index] = vc)"
                v-if="row.flag"
                @blur="toLook(row, $index)"
                placeholder="请输入属性值名称"
                v-model="row.valueName"
              ></el-input>
              <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作">
            <template #="{ $index }">
              <el-button
                type="danger"
                icon="Delete"
                size="small"
                @click="attrParams.attrValueList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          size="small"
          @click="save"
          :disabled="
            attrParams.attrValueList.length &&
            attrParams.attrValueList[0].valueName
              ? false
              : true
          "
        >
          保存
        </el-button>
        <el-button size="small" @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import useCategoryStore from '@/store/modules/category'
import { watch, ref, reactive, nextTick, onMounted, onBeforeUnmount } from 'vue'
import type { AttrResponseData, Attr, AttrValue } from '@/api/product/attr/type'
import { ElMessage } from 'element-plus'
import { reqAttr, reqAddOrUpdateAttr, reqRemoveAttr } from '@/api/product/attr'
let attrArr = ref<Attr[]>([])
let scene = ref<number>(0)
const categoryStore = useCategoryStore()
onMounted(() => {
  getAttr()
})
watch(
  () => categoryStore.c3Id,
  () => {
    attrArr.value = []
    if (categoryStore.c3Id) {
      getAttr()
    }
  },
)
//el-input组件实例\
let inputArr = ref<any>([])
const toLook = (row: AttrValue, index: number) => {
  if (row.valueName.trim() === '') {
    attrParams.attrValueList.splice(index, 1)
    ElMessage.error('属性值名称不能为空')
    return
  }
  let repeat = attrParams.attrValueList.find((item) => {
    if (item != row) {
      return item.valueName === row.valueName
    }
  })
  if (repeat) {
    ElMessage.error('属性值名称不能重复')
    attrParams.attrValueList.splice(index, 1)
    return
  }
  row.flag = false
}
const toEdit = (row: AttrValue, index: number) => {
  row.flag = true
  nextTick(() => {
    inputArr.value[index].focus()
  })
}
const save = async () => {
  const res = await reqAddOrUpdateAttr(attrParams)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功',
    })
    getAttr()
    scene.value = 0
  } else {
    ElMessage.error(res.message)
  }
}
const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: '',
    flag: true,
  })
  nextTick(() => {
    inputArr.value[inputArr.value.length - 1].focus()
  })
}
const cancel = () => {
  scene.value = 0
}
const addAttr = () => {
  //清空
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
    categoryId: categoryStore.c3Id,
    categoryLevel: 3,
  })
  scene.value = 1
}
const deleteAttr = async (attrId: number) => {
  const res = await reqRemoveAttr(attrId)
  if (res.code == 200) {
    ElMessage.success('删除成功')
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
  getAttr()
}
const updateAttr = (row: Attr) => {
  scene.value = 1
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}
const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore
  const res: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
  if (res.code === 200) {
    attrArr.value = res.data
  } else {
    ElMessage.error('获取属性失败')
  }
}
//收集新增属性
let attrParams = reactive<Attr>({
  attrName: '',
  attrValueList: [],
  categoryId: '',
  categoryLevel: 3,
})
onBeforeUnmount(() => {
  categoryStore.$reset()
})
</script>

<style scoped></style>
