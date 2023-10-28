<template>
  <div class="box">
    <img src="../../assets/images/error_images/404.png" alt="" />
  </div>
  <el-button class="button" type="primary" @click="goHome">返回首页</el-button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
let $router = useRouter()
const goHome = () => {
  $router.push('/home')
}
</script>

<style scoped lang="scss">
.box {
  width: 100vw;
  height: 100vh;
  background: yellowgreen;
  display: flex;
  justify-content: center;

  img {
    width: 800px;
    height: 400px;
  }
}
.button {
  position: absolute;
  display: flex;
  bottom: 25%;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 50px;
  // background: #fff;
  border: 3px solid #cccc;
  border-radius: 5px;
  font-size: 20px;
  // color: #333;
  letter-spacing: 10px;
  cursor: pointer;
  border-radius: 10px 25px;
}
</style>
