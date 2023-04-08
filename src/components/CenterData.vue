<script setup>
import { ref, reactive, toRefs } from 'vue';
import { Sunny } from '@element-plus/icons-vue';
import { ElMessageBox } from 'element-plus';
import { createAxiosByinterceptors } from '../utils/net';
import { useUserStore } from '../stores/user';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';

const router = useRouter();
const userStore = useUserStore();
const { id, username, email, points } = storeToRefs(userStore);
const changeHeight = ref();
const changeChargeHeight = ref();
const ruleFormRef = ref();
const dialogFormVisible = ref(false);
const dialogVisible = ref(false);
const dialogChargeVisible = ref(false);
const formLabelWidth = '140px';
const chargeNum = ref(1);
let chargeList = reactive([]);
let orderData = reactive([]);
document.title = `Hello!${username.value} 个人中心~`;

// 修改密码表单部分
let form = reactive({
  oldPwd: '',
  newPwd: '',
  checkPwd: '',
});

function confirmPass(rule, value, callback) {
  if (value !== form.newPwd) {
    callback(new Error('两次的密码不一致!'));
  } else {
    callback();
  }
}

const rules = reactive({
  oldPwd: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 18, message: '长度应为6~18', trigger: 'blur' },
  ],
  newPwd: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 18, message: '长度应为6~18', trigger: 'blur' },
  ],
  checkPwd: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { min: 6, max: 18, message: '长度应为6~18', trigger: 'blur' },
    { validator: confirmPass, trigger: 'blur' },
  ],
});

// UTC格式化
function formatTime(row) {
  return dayjs(row.Time).format('YYYY-MM-DD HH:mm:ss');
}

// 网络请求
const request = createAxiosByinterceptors({});
let apiData = reactive({});
let api = reactive({});

// 消息提示
function msg(message = '用户名或密码不正确', type = 'error') {
  ElMessage({
    showClose: true,
    message: message,
    type: type,
    duration: 1000,
    offset: 450,
  });
}

// 错误处理
function tokenTimeOut() {
  msg('身份认证已过期,请重新登陆', 'warning');
  (id.value = ''),
    (username.value = ''),
    (email.value = ''),
    (points.value = 0);
  setTimeout(() => {
    router.replace({ path: '/' });
  }, 1000);
}

function getCharge() {
  return request
    .get(`/userCtrl/getCharge/${id.value}`)
    .then(response => {
      if (response.data.status === 0) {
        chargeList = response.data.data;
        changeChargeHeight.value += response.data.dataCount * 40;
      } else if (response.data.status === 401) {
        tokenTimeOut();
      } else if (response.data.status === 1) {
        msg('获取数据失败,请稍后再试');
      }
    })
    .catch(error => {
      console.log(error);
    });
}

function getOrder() {
  return request
    .get(`/userCtrl/getOrder/${id.value}`)
    .then(response => {
      if (response.data.status === 0) {
        orderData = response.data.data;
        changeHeight.value += response.data.dataCount * 40;
      } else if (response.data.status === 1) {
        msg('获取数据失败,请稍后再试');
        console.log(response);
      }
    })
    .catch(error => {
      console.log(error);
    });
}

function changePwd(Id, oldPwd, newPwd) {
  return request
    .post(`/userCtrl/changePwd/${Id}/${oldPwd}/${newPwd}`)
    .then(response => {
      if (response.data.status === 0) {
        msg('密码修改成功,请重新登录', 'success');
        router.replace({ path: '/' });
        sessionStorage.removeItem('userToken');
        // 表单信息清空
        (id.value = ''),
          (username.value = ''),
          (email.value = ''),
          (points.value = 0);
      } else if (response.data.status === 401) {
        tokenTimeOut();
      } else if (response.data.status === 403) {
        msg('旧密码错误,请重新输入');
      } else if (response.data.status === 1) {
        msg('修改密码失败,请稍后再试');
        console.log(response);
      }
    })
    .catch(error => {
      console.log(error);
    });
}

function deleteSelf(id) {
  return request
    .post(`/userCtrl/deleteSelf/${id}`)
    .then(response => {
      if (response.data.status === 0) {
        msg('账户已成功注销,再见', 'success');
        router.replace({ path: '/' });
        sessionStorage.removeItem('userToken');
        // 表单信息清空
        (id.value = ''),
          (username.value = ''),
          (email.value = ''),
          (points.value = 0);
      } else if (response.data.status === 401) {
        tokenTimeOut();
      } else if (response.data.status === 1) {
        msg('删除账户失败,请稍后再试');
      }
    })
    .catch(error => {
      console.log(error);
    });
}

function charge() {
  return request
    .post(`/userCtrl/chargePoints/${id.value}/${chargeNum.value}`)
    .then(response => {
      if (response.data.status === 0) {
        msg('积分充值成功!', 'success');
        dialogChargeVisible.value = false;
        // 表单信息清空
        chargeNum.value = 1;
        points.value = response.data.Points;
        router.go(0); // 强制刷新
      } else if (response.data.status === 401) {
        tokenTimeOut();
      } else if (response.data.status === 1) {
        msg('积分充值失败,请稍后再试');
      }
      // getCharge();
    })
    .catch(error => {
      console.log(error);
    });
}

// 处理函数
function submit(formRef) {
  // 判断校验
  formRef.validate(isPass => {
    if (isPass) {
      changePwd(id.value, form.oldPwd, form.newPwd);
    } else {
      msg('请检查数据是否合法!');
    }
  });
}

function confirmDele() {
  deleteSelf(id.value);
}

// 开局调用
// getPersonal();
getCharge();
getOrder();
</script>

<template>
  <!-- 修改密码 表单内容 -->
  <el-dialog
    v-model="dialogFormVisible"
    title="修改密码"
    align-center
    style="min-width: 300px">
    <el-form :model="form" :rules="rules" ref="ruleFormRef">
      <!-- 旧密码 -->
      <el-form-item label="旧密码" :label-width="formLabelWidth" prop="oldPwd">
        <el-input
          v-model="form.oldPwd"
          type="password"
          show-password
          style="width: 40%; min-width: 200px" />
      </el-form-item>

      <!-- 新密码 -->
      <el-form-item label="密码" :label-width="formLabelWidth" prop="newPwd">
        <el-input
          v-model="form.newPwd"
          type="password"
          show-password
          style="width: 40%; min-width: 200px" />
      </el-form-item>

      <!-- 密码确认 -->
      <el-form-item
        label="确认密码"
        :label-width="formLabelWidth"
        prop="checkPwd">
        <el-input
          v-model="form.checkPwd"
          type="password"
          show-password
          style="width: 40%; min-width: 200px" />
      </el-form-item>
    </el-form>

    <!-- 确认/取消 -->

    <span class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" @click="submit(ruleFormRef)"> 确认 </el-button>
    </span>
  </el-dialog>

  <!-- 删除账号 对话框 -->
  <el-dialog
    v-model="dialogVisible"
    title="确认删除账户"
    width="30%"
    style="min-width: 300px">
    <div class="el-dialog-div">
      <span class="confirm-dialog"
        >您的账号的所有数据将会被销毁且无法再恢复,您确认删除吗?</span
      >

      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmDele"> 确认删除 </el-button>
      </span>
    </div>
  </el-dialog>

  <!-- 充值输入框 -->
  <el-dialog
    v-model="dialogChargeVisible"
    title="积分充值"
    width="30%"
    style="min-width: 300px">
    <div class="text">请输入充值金额,1￥ = 5积分</div>

    <div class="el-dialog-div">
      <el-input-number v-model="chargeNum" :min="1" :max="10000" />

      <span class="dialog-footer">
        <el-button @click="dialogChargeVisible = false">取消</el-button>
        <el-button type="primary" @click="charge"> 确认充值 </el-button>
      </span>
    </div>
  </el-dialog>

  <!-- 界面本体 -->
  <!-- 我的账号 -->
  <el-row>
    <el-col :span="24"><div class="title">我的账号</div></el-col>
  </el-row>
  <!-- 招呼语 -->
  <el-row class="salutation">
    <el-icon class="icon"><Sunny /></el-icon>
    <span class="username">Hi,{{ username }}!</span>
  </el-row>
  <el-row class="email">
    <span>{{ email }}</span>
  </el-row>
  <!-- 用户功能 -->
  <el-row :gutter="30" class="control-group">
    <el-col :xs="24" :md="12">
      <div class="control changePwd">
        <div class="iconfont icon-lock"></div>
        <div class="content">
          <h3>修改密码</h3>
          <p>定期修改为高强度密码以保护您的账号</p>
          <span @click="dialogFormVisible = true">立即修改</span>
        </div>
      </div>
    </el-col>
    <el-col :xs="24" :md="12">
      <div class="control top-up">
        <div class="iconfont icon-dollar"></div>
        <div class="content">
          <h3>充值积分</h3>
          <p>积分能够购买所需内容,为我们提供帮助</p>
          <span @click="dialogChargeVisible = true">立即充值</span>
        </div>
      </div>
    </el-col>
    <el-col :xs="24" :md="12">
      <div class="control delete">
        <div class="iconfont icon-skull"></div>
        <div class="content">
          <h3>删除账户</h3>
          <p>您的所有数据都会被删除，无法找回</p>
          <span @click="dialogVisible = true">立即删除</span>
        </div>
      </div>
    </el-col>
  </el-row>
  <el-row>
    <div class="point">
      <div>{{ points }}</div>
      <div>{{ username }} 的积分</div>
    </div>
  </el-row>
  <el-row>
    <div class="bought">
      <div class="bought-header">充值记录</div>
      <div class="bought-body" v-show="chargeList.length > 0">
        <el-table
          :data="chargeList"
          stripe
          :height="changeChargeHeight + 'px'"
          style="width: 90%"
          class="bought-table">
          <el-table-column prop="Bought" label="充值金额" min-width="100" />
          <el-table-column
            prop="Time"
            label="充值日期"
            min-width="60"
            :formatter="formatTime" />
        </el-table>
      </div>
      <el-empty description="没有订单喔~" v-show="chargeList.length === 0" />
    </div>
  </el-row>
  <el-row>
    <div class="bought">
      <div class="bought-header">我的订单</div>
      <div class="bought-body" v-show="orderData.length > 0">
        <el-table
          :data="orderData"
          stripe
          :height="changeHeight + 'px'"
          style="width: 90%"
          class="bought-table">
          <el-table-column prop="Title" label="文章标题" min-width="100" />

          <el-table-column
            prop="Time"
            label="购买日期"
            min-width="60"
            :formatter="formatTime" />
          <!-- <el-table-column prop="address" label="Operation" /> -->
        </el-table>
      </div>
      <el-empty description="没有订单喔~" v-show="orderData.length === 0" />
    </div>
  </el-row>
</template>

<style scoped>
.title {
  background-color: #686de0;
  font-size: 28px;
  color: #fff;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: -20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
}
.salutation {
  padding-top: 20px;
  padding-left: 20px;
}
.icon {
  font-size: 48px;
  color: #686de0;
}
.username {
  line-height: 48px;
  font-size: 18px;
  padding-left: 10px;
}
.email {
  font-size: 14px;
  color: #6c757d;
  padding-left: 78px;
}
.control-group {
  margin-top: 40px;
}
.control {
  background-color: skyblue;
  height: 30px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  height: 150px;
  width: 100%;
  display: flex;
}
.iconfont {
  background-color: #686de0;
  font-size: 96px;
  color: #fff;
  width: 145px;
  line-height: 150px;
  padding-left: 45px;
}
.content {
  background-color: #fff;
  height: 150px;
  width: 100px;
  flex-grow: 1;
  padding: 25px 30px;
  box-sizing: border-box;
}
h3 {
  color: #6c757d;
}
.control p {
  font-family: 'Software Yahei';
  color: #6c757d;
  font-weight: 500;
  font-size: 14px;
  padding-top: 8px;
  padding-bottom: 20px;
}
.control span {
  color: #686de0;
  cursor: pointer;
}
.delete {
  margin-top: 30px;
}
@media screen and (max-width: 992px) {
  .top-up {
    margin-top: 30px;
  }
}
.point {
  /* background-color: #fff; */
  color: #fff;
  width: 100%;
  height: 160px;
  margin-top: 40px;
  background-image: linear-gradient(
    -225deg,
    #5271c4 0%,
    #b19fff 48%,
    #eca1fe 100%
  );
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
}

.point div {
  font-size: 36px;
  padding-left: 30px;
}
.point div:nth-of-type(1) {
  padding-top: 30px;
}
.point div:nth-of-type(2) {
  padding-top: 16px;
  font-size: 24px;
}
.bought {
  width: 100%;
  background-color: #fff;
  margin-top: 40px;
  /* min-height: 200px; */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  margin-bottom: 20px;
}
.bought-header {
  color: #686de0;
  line-height: 24px;
  margin-top: 30px;
  margin-left: 30px;
  padding-bottom: 30px;
  box-sizing: border-box;
  border-bottom: 1px solid #f9f9f9;
}
.bought-body {
  padding-top: 20px;
  padding-left: 30px;
  padding-bottom: 40px;
}
@media screen and (max-width: 768px) {
  :deep(.el-form-item__label) {
    justify-content: flex-start;
  }
  :deep(.el-form-item__label) {
    width: 80px !important;
  }
  :deep(.el-input__wrapper) {
    margin-right: 10px;
  }
}
.dialog-footer {
  float: right;
  margin: 60px 0;
}
.el-dialog-div {
  height: 126px;
  overflow: auto;
}
.text {
  margin-bottom: 16px;
}
:deep(.el-input-number) {
  left: 35%;
}
@media screen and (max-width: 1167px) {
  .el-dialog-div {
    height: 146px;
  }
  :deep(.el-input-number) {
    left: 10%;
  }
}
</style>
