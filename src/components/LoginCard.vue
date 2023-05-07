<script setup>
import { User, Lock } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { ref, reactive } from 'vue';
import { createAxiosByinterceptors } from '../utils/net';
import { useAdminStore } from '../stores/admin';
import { storeToRefs } from 'pinia';

const adminStore = useAdminStore();
const { id, username, email, isActive, power } = storeToRefs(adminStore);
const router = useRouter();
const ruleFormRef = ref();

const form = reactive({
  username: '',
  password: '',
});

const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度应为3~8', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 18, message: '长度应为6~14', trigger: 'blur' },
  ],
});

// 网络请求
const request = createAxiosByinterceptors({});
let apiData = reactive({});
let api = reactive({});

function errMsg() {
  ElMessage({
    showClose: true,
    message: '用户名或密码不正确',
    type: 'error',
    duration: 1000,
    offset: 450,
  });
}

function toHome() {
  return request
    .get(`/admin/auth`)
    .then(response => {
      if (response.data.status === 0) {
        router.replace({ path: '/admin' });
      }
    })

    .catch(error => {
      console.log(error);
    });
}

function postLogin() {
  return request
    .post(`/login/${form.username}/${form.password}`)
    .then(response => {
      api = response.data;
      apiData = response.data.data;
      console.log(apiData);
      if (api.data.isActive == 0) {
        ElMessage({
          showClose: true,
          message: '该账号已被冻结!',
          type: 'error',
          duration: 1000,
          offset: 450,
        });
      } // 登陆成功跳转页面,存储sessionStorage
      else if (api.status === 0) {
        ElMessage({
          showClose: true,
          message: '登陆成功!',
          type: 'success',
          duration: 1000,
          offset: 450,
        });
        // session过程
        sessionStorage.setItem(
          'adminToken',
          JSON.stringify(response.data.token)
        );
        // 存储个人信息
        (id.value = apiData.id),
          (username.value = apiData.username),
          (email.value = apiData.email),
          (isActive.value = apiData.isActive),
          (power.value = apiData.power);

        setTimeout(() => {
          router.replace({ path: '/admin' });
        }, 500);
      } else if (api.status === 1) {
        // 登陆失败
        errMsg();
      }
    })
    .catch(error => {
      console.log(error);
      errMsg();
    });
}

function submitForm(formRef) {
  // 判断校验
  formRef.validate(isPass => {
    if (isPass) {
      postLogin();
    } else {
      errMsg();
    }
  });
}

// 登陆界面验证
toHome();
</script>

<template>
  <el-row>
    <el-col :span="14">
      <div class="grid-content">
        <img
          src="@/assets/img/undraw_team_collaboration_re_ow29.svg"
          alt="img"
          class="login-img" />
      </div>
    </el-col>
    <el-col :span="10">
      <div class="grid-content login-card-right">
        <h1>欢迎回来</h1>
        <span>登录进入软硬件信息安全综合资讯平台管理系统</span>

        <div class="input">
          <!-- 用户名密码 -->
          <el-form :model="form" :rules="rules" ref="ruleFormRef">
            <el-form-item prop="username">
              <el-input
                v-model="form.username"
                placeholder="Username"
                size="large"
                clearable
                :prefix-icon="User"
                class="input-username" />
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                v-model="form.password"
                placeholder="Password"
                size="large"
                clearable
                show-password
                :prefix-icon="Lock"
                class="input-password" />
            </el-form-item>
          </el-form>
          <div class="login-btn-container">
            <el-button
              color="#626aef"
              size="large"
              class="login-btn"
              @click="submitForm(ruleFormRef)"
              >登录</el-button
            >
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped>
.login-img {
  width: 100%;
  margin-top: 100px;
}
.login-card-right {
  padding-left: 60px;
  padding-right: 20px;
  padding-top: 100px;
}
h1 {
  font-size: 48px;
  padding-bottom: 10px;
}
.input {
  padding-top: 50px;
}
.input-username,
.input-password {
  width: 300px;
  height: 50px;
}
.input-password {
  margin-top: 10px;
}
.login-btn-container {
  margin-top: 60px;
}
.login-btn {
  width: 300px;
  height: 45px;
}
</style>
