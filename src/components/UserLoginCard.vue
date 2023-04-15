<script setup>
import { User, Lock, Message } from '@element-plus/icons-vue';
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { createAxiosByinterceptors } from '../utils/net';
import code from '../utils/verificationCode';
import { useUserStore } from '../stores/user';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
const { id, username, email, points } = storeToRefs(userStore);
const ruleFormRef = ref();
const regRuleFormRef = ref();
const cardOpen = ref(false);
const isLogin = ref(true);

// 登陆表单
const form = reactive({
  username: '',
  password: '',
  code: '',
});

// 验证验证码
let codeTxt = ref('');

function getCode() {
  codeTxt.value = code(options);
  console.log(codeTxt.value);
}
function confirmCode(rule, value, callback) {
  if (value !== codeTxt.value) {
    callback(new Error('验证码不正确!'));
  } else {
    callback();
  }
}

const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度应为3~8', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 18, message: '长度应为6~14', trigger: 'blur' },
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { validator: confirmCode, trigger: ['input'] },
  ],
});

// 验证码
let options = {
  canvasId: 'mycanvas',
  width: 150,
  height: 40,
  txt: '',
};

// 注册表单
const regForm = reactive({
  username: '',
  password: '',
  checkPass: '',
  email: '',
});

function confirmPass(rule, value, callback) {
  if (value !== regForm.password) {
    callback(new Error('两次的密码不一致!'));
  } else {
    callback();
  }
}

function isIllegal(rule, value, callback) {
  const regex =
    /\>|\<|\/|\(|\)|\[|\]|\{|\}|\&lt;|\&gt;|\'|\"|\`|\~|\!|\#|\$|\%|\^|\&amp;|\*|\-|\+|\=|\||\\\:|\\\\/g;
  // console.log(reg.test(value));
  if (regex.test(value)) {
    callback(new Error('请勿输入非法字符!'));
  } else {
    callback();
  }
}

const regRules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度应为3~10', trigger: 'blur' },
    { validator: isIllegal, trigger: ['blur', 'change'] },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 18, message: '长度应为6~18', trigger: 'blur' },
    { validator: isIllegal, trigger: ['blur', 'change'] },
  ],
  checkPass: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { min: 6, max: 18, message: '长度应为6~18', trigger: 'blur' },
    { validator: isIllegal, trigger: ['blur', 'change'] },

    { validator: confirmPass, trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入您的邮箱地址', trigger: 'blur' },
    {
      type: 'email',
      message: '请输入正确的邮箱!',
      trigger: ['blur', 'change'],
    },
    { validator: isIllegal, trigger: ['blur', 'change'] },
  ],
});

// 网络请求
const request = createAxiosByinterceptors({});
let apiData = reactive({});
let api = reactive({});

// 错误提示
function errMsg(message = '用户名或密码不正确') {
  ElMessage({
    showClose: true,
    message: message,
    type: 'error',
    duration: 1000,
    offset: 450,
  });
}

// 登录函数
function postLogin() {
  return request
    .post(`/login/user/${form.username}/${form.password}`)
    .then(response => {
      api = response.data;
      apiData = response.data.data;

      // 登陆成功跳转页面,存储sessionStorage
      if (api.status === 0) {
        ElMessage({
          showClose: true,
          message: '登陆成功!',
          type: 'success',
          duration: 1000,
          offset: 450,
        });
        // session过程
        sessionStorage.setItem(
          'userToken',
          JSON.stringify(response.data.token)
        );
        // 存储个人信息
        (id.value = apiData.id),
          (username.value = apiData.username),
          (email.value = apiData.email),
          (points.value = apiData.points);
        //表单关闭清空
        (form.username = ''), (form.password = ''), (cardOpen.value = false);
        router.go(0);
      } else if (api.status === 1) {
        // 登陆失败
        errMsg();
      }
    })
    .catch(error => {
      console.log(error);
    });
}

// 注册函数
function postReg() {
  return request
    .post(
      `/login/userReg/${regForm.username}/${regForm.password}/${regForm.email}`
    )
    .then(response => {
      api = response.data;
      apiData = response.data.data;
      console.log(api);

      // 登陆成功跳转页面,存储sessionStorage
      if (api.status === 0) {
        ElMessage({
          showClose: true,
          message: '注册成功请重新登陆!',
          type: 'success',
          duration: 1000,
          offset: 450,
        });

        //表单关闭清空
        (isLogin.value = true),
          (regForm.username = ''),
          (regForm.password = ''),
          (regForm.email = '');
      } else if (api.status === 402) {
        // 注册失败,用户名冲突
        errMsg('该用户名已被占用!');
      } else if (api.status === 1) {
        // 注册失败
        errMsg('注册失败,请稍后再试');
      }
    })
    .catch(error => {
      console.log(error);
    });
}

// 表单校验
function submitForm(formRef) {
  // 判断校验
  formRef.validate(isPass => {
    if (isPass) {
      postLogin();
    } else {
    }
  });
}

function submitReg(formRef) {
  // 判断校验
  formRef.validate(isPass => {
    if (isPass) {
      postReg();
    } else {
      errMsg('请检查数据是否合法!');
    }
  });
}
</script>

<template>
  <div @click="cardOpen = false">
    <div
      class="login"
      @click.stop="
        cardOpen = true;
        getCode();
      ">
      登录
    </div>

    <!-- 模态 -->
    <div class="modal" v-show="cardOpen">
      <!-- 模态内容 登录 -->
      <div class="modal-content" @click.stop v-show="isLogin">
        <!-- header -->
        <div class="modal-header">
          <span class="close" @click="cardOpen = false">&times;</span>
          <h4>密码登录</h4>
        </div>

        <!-- body -->
        <div class="modal-body">
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

            <!-- 验证码 -->
            <el-form-item prop="code">
              <canvas
                id="mycanvas"
                title="这张看不清,换一张"
                @click="getCode"></canvas
              ><br /><br />
              <el-input
                v-model="form.code"
                placeholder="验证码"
                size="large"
                clearable
                class="input-code" />
            </el-form-item>

            <span class="toReg" @click="isLogin = false">没有账号?</span>
          </el-form>
        </div>

        <!-- footer -->
        <div class="modal-footer">
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

      <!-- 模态内容 注册-->
      <div class="modal-content reg-form" @click.stop v-show="!isLogin">
        <!-- header -->
        <div class="modal-header">
          <span class="close" @click="cardOpen = false">&times;</span>
          <h4>账号注册</h4>
        </div>

        <!-- body -->
        <div class="modal-body">
          <el-form :model="regForm" :rules="regRules" ref="regRuleFormRef">
            <el-form-item prop="username">
              <el-input
                v-model="regForm.username"
                placeholder="用户名"
                size="large"
                clearable
                :prefix-icon="User"
                class="input-username" />
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                v-model="regForm.password"
                placeholder="密码"
                size="large"
                clearable
                show-password
                :prefix-icon="Lock"
                class="input-password" />
            </el-form-item>

            <el-form-item prop="checkPass">
              <el-input
                v-model="regForm.checkPass"
                placeholder="再次输入密码"
                size="large"
                clearable
                show-password
                :prefix-icon="Lock"
                class="input-password" />
            </el-form-item>

            <el-form-item prop="email">
              <el-input
                v-model="regForm.email"
                placeholder="电子邮箱"
                size="large"
                clearable
                :prefix-icon="Message"
                class="input-password" />
            </el-form-item>
            <span class="toReg" @click="isLogin = true">已有帐号?</span>
          </el-form>
        </div>

        <!-- footer -->
        <div class="modal-footer">
          <div class="login-btn-container">
            <el-button
              color="#626aef"
              size="large"
              class="login-btn"
              @click="submitReg(regRuleFormRef)"
              >注册/登录</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login {
  line-height: 57px;
  font-size: 14px;
  padding-left: 20px;
  padding-right: 20px;
  color: #4834d4;
  cursor: pointer;
}
/* 模态（背景） */
.modal {
  position: fixed; /* 留在原地 */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* 全屏宽度 */
  height: 100%; /* 全屏高度 */
  overflow: hidden; /* 如果需要，启用滚动 */
  background-color: rgb(0, 0, 0); /* 后备颜色 */
  background-color: rgba(0, 0, 0, 0.4); /* 黑色带不透明度 */
}

/* 模态内容/框 */
.modal-content {
  background-color: #fefefe;
  margin: 13% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 23%;
  min-width: 350px;
  height: 450px;
}
.reg-form {
  height: 520px;
}
.modal-body {
  margin-top: 50px;
}
.modal-body,
.modal-footer {
  display: flex;
  justify-content: center;
}
.input-username,
.input-password {
  width: 300px;
  height: 50px;
}
.input-password {
  margin-top: 10px;
}
#mycanvas {
  cursor: pointer;
}
.input-code {
  display: inline-block;
  width: 120px;
  margin-left: 30px;
}
.login-btn-container {
  margin-top: 60px;
}
.login-btn {
  width: 300px;
  height: 45px;
}
.toReg {
  font-size: 14px;
  color: #4834d4;
  cursor: pointer;
}
/* 关闭按钮 */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
