<template>
  <el-card>
    <div class="head">
      <img :src="userStore.avatar" alt="" />
      <div class="content">
        <h1 style="font-weight: 800">
          {{ message }}
          <span class="name">
            {{ userStore.username }}
          </span>
        </h1>
        <p class="bottom">
          {{ setting.title }}
        </p>
      </div>
    </div>
  </el-card>
  <svg-icon name="welcome" width="500px" height="500px" class="bac"></svg-icon>
</template>

<script setup lang="ts">
import useUerStore from '@/store/modules/user'
import { getTime } from '@/utils/time'
// import Svgicon from '@/components/SvgIcon/index.vue'
import setting from '@/setting'
const userStore = useUerStore()
let message = getTime()
message += '好'
</script>

<style scoped lang="scss">
.head {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  img {
    margin-right: 20px;
    border-radius: 50%;
    width: 80px;
    height: 80px;
  }
  .content {
    font-size: 28px;
    align-self: flex-start;
    margin-top: 5px;
    .name {
      // 3d效果
      position: relative;
      display: inline-block;
      color: #fff;
      font-size: 25px;
      background: #1890ff;
      padding: 2px 10px;
      border-radius: 10px;
    }
    .bottom {
      margin-top: 20px;
      font-size: 18px;
      font-style: italic;
      color: #555;
    }
  }
}
.bac {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
