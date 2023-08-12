<template>
  <div class="login_container">
    <el-row>
      <!--占位-->
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_from"
          :model="loginFrom"
          :rules="rules"
          ref="loginFroms"
        >
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginFrom.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              show-password
              v-model="loginFrom.password"
            ></el-input>
          </el-form-item>
          <el-from-item>
            <el-button
              :loading="loading"
              class="login_btn"
              type="primary"
              size="default"
              @click="login"
            >
              login
            </el-button>
          </el-from-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
import { getTime } from '@/utils/time'
import { ElNotification } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
const $router = useRouter()
const $route = useRoute()
//获取el-from组件
const loginFroms = ref()
//引入用户相关小产库
import useUserStore from '@/store/modules/user.ts'
const useStore = useUserStore()
//按钮加载
const loading = ref(false)
//收集账号密码
const loginFrom = reactive({ username: 'admin', password: 'atguigu123' })
//自定义校验规则
const validatorUserName = (rule: any, value: any, callback: any) => {
  if (value.length >= 5 && value.length <= 10) {
    callback()
  } else {
    callback(new Error('名称应在5-10位'))
  }
}
const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length >= 5 && value.length <= 10) {
    callback()
  } else {
    callback(new Error('密码应在6-10位'))
  }
}
//表单规则
const rules = {
  username: [
    // {
    //   required: true,
    //   message: '用户名不能为空',
    //   trigger: 'blur',
    // },
    // { min: 5, max: 10, message: '名字长度应在5-10', trigger: 'change' },
    {
      validator: validatorUserName,
      trigger: 'change',
    },
  ],
  password: [
    // {
    //   required: true,
    //   message: '密码不能为空',
    //   trigger: 'blur',
    // },
    // { min: 5, max: 10, message: '密码长度应在6-10', trigger: 'change' },
    { validator: validatorPassword, trigger: 'change' },
  ],
}
//登录按钮回调
const login = async () => {
  //保证所有表单项校验通过
  await loginFroms.value.validate()
  //开始加载
  loading.value = true
  try {
    await useStore.userLogin(loginFrom)
    //编程样导航跳转
    let redirect: any = $route.query.redirect
    $router.push({ path: redirect || '/' })
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `hi,${getTime()}好`,
    })
    //登陆成功 加载消失
    loading.value = false
  } catch (error) {
    //登录失败 加载消失
    loading.value = false
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}
</script>
<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg');
  .login_from {
    width: 80%;
    position: relative;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }
    h2 {
      color: white;
      font-size: 20px;
      margin: 20px 0;
    }
    .login_btn {
      width: 100%;
    }
  }
}
</style>
