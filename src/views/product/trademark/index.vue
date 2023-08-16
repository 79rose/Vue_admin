<template>
  <el-card class="box-card">
    <!--添加品牌  -->
    <el-button type="primary" size="default" icon="Plus" @click="addTrademark">
      添加品牌
    </el-button>
    <!-- 表格展示信息 -->
    <el-table style="margin: 5px 0px" border :data="trademarkArr">
      <el-table-column
        label="序号"
        width="80px"
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column label="名称">
        <!-- eslint-disable-next-line vue/valid-attribute-name -->
        <template #="{ row }">
          <pre style="color: brown">{{ row.tmName }}</pre>
        </template>
      </el-table-column>
      <el-table-column label="logo">
        <!-- eslint-disable-next-line vue/valid-attribute-name -->
        <template #="{ row }">
          <img
            :src="row.logoUrl || defaultImage"
            style="width: 95px; height: 95px"
            @error="
              (e: any): void => {
                e.target.src = defaultImage
              }
            "
          />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <!-- eslint-disable-next-line vue/valid-attribute-name -->
        <template #="row">
          <el-button
            type="primary"
            icon="Edit"
            size="small"
            @click="updateTrademark(row.row)"
          ></el-button>
          <el-popconfirm
            width="250"
            cancel-button-type="primary"
            confirm-button-text="YES"
            cancel-button-text="NO"
            icon="Delete"
            icon-color="#f90"
            title="确定删除吗?"
            @confirm="removeTrademark(row.row.id)"
          >
            <template #reference>
              <el-button type="danger" icon="Delete" size="small"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      @size-change="sizeChange"
      @current-change="getHasTrademark"
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-count="Math.ceil(total / limit)"
      :page-sizes="[4, 6, 8, 10]"
      :background="true"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
    />
  </el-card>
  <!-- 对话框 修改品牌 -->
  <el-dialog
    v-model="dialogFormVisible"
    :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
  >
    <el-from ref="ruleFormRef" :rules="rules" :model="trademarkParams">
      <el-form-item
        label-width="80px"
        label="品牌名称"
        :prop="trademarkParams.tmName"
      >
        <el-input
          style="width: 80%"
          v-model="trademarkParams.tmName"
          placeholder="请您输入品牌"
        ></el-input>
      </el-form-item>
      <el-form-item
        label-width="80px"
        label="品牌logo"
        :prop="trademarkParams.logoUrl"
      >
        <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="trademarkParams.logoUrl"
            :src="trademarkParams.logoUrl"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-from>
    <template #footer>
      <el-button type="primary" @click="cancel">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
} from '@/api/product/trademark/index'
import { ref, onMounted, reactive } from 'vue'
import type {
  Records,
  TradeMarkResponsedata,
  TradeMark,
} from '@/api/product/trademark/type'
import defaultImage from '../../../../public/default.png'
import { ElMessage, type UploadProps } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
const ruleFormRef = ref<FormInstance>()
let pageNo = ref<number>(1)
let limit = ref<number>(4)
let total = ref<number>(0)
let trademarkArr = ref<Records>([])
//收集新增品牌
let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})
// 对话框显示与隐藏
let dialogFormVisible = ref<boolean>(false)
//添加品牌
const addTrademark = () => {
  dialogFormVisible.value = !dialogFormVisible.value
  //清空
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
  trademarkParams.id = 0
}
//修改品牌
const updateTrademark = (row: TradeMark) => {
  dialogFormVisible.value = !dialogFormVisible.value
  // Object.assign(trademarkParams, row)
  trademarkParams.tmName = row.tmName
  trademarkParams.logoUrl = row.logoUrl
  trademarkParams.id = row.id
}
//删除品牌
const removeTrademark = async (id: number) => {
  const res = await reqDeleteTrademark(id)
  if (res.code == 200) {
    ElMessage.success('删除成功')
    getHasTrademark(pageNo.value)
  } else {
    ElMessage.error('删除失败')
  }
}
// 对话框 取消 确定
const cancel = () => {
  dialogFormVisible.value = !dialogFormVisible.value
}
const confirm = async () => {
  // 简陋表单验证
  if (trademarkParams.tmName == '') {
    ElMessage.error('请输入品牌名称')
    return
  } else if (trademarkParams.logoUrl == '') {
    ElMessage.error('请上传品牌logo')
    return
  }
  const res: any = await reqAddOrUpdateTrademark(trademarkParams)
  if (res.code == 200) {
    dialogFormVisible.value = !dialogFormVisible.value
    ElMessage.success({
      type: 'success',
      message: trademarkParams.id ? '修改成功' : '添加成功',
    })
    getHasTrademark(trademarkParams.id ? pageNo.value : 1)
  } else {
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改失败' : '添加失败',
    })
    dialogFormVisible.value = !dialogFormVisible.value
  }
}
//上传图片之前的约束
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile: any) => {
  //图片限制 png|jpg|gif 4m
  if (
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/jpg' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size < 4 * 1024 * 1024) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件大小应小于4M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件格式应为PNG|JPG|GIF',
    })
    return false
  }
}
//上传图片成功之后
const handleAvatarSuccess: UploadProps['onSuccess'] = (response: any) => {
  trademarkParams.logoUrl = response.data
}
const getHasTrademark = async (page = 1) => {
  pageNo.value = page
  const res: TradeMarkResponsedata = await reqHasTrademark(
    pageNo.value,
    limit.value,
  )
  if (res.code === 200) {
    total.value = res.data.total
    trademarkArr.value = res.data.records
  }
}
onMounted(() => {
  getHasTrademark()
})
const sizeChange = () => {
  getHasTrademark()
}
//自定义表单校验
const rules = reactive<FormRules<TradeMark>>({
  tmName: [
    { required: true, message: '必须填写商标名称', trigger: 'blur' },
    { min: 2, message: '名称长度应大于等于2', trigger: 'blur' },
  ],
})
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
