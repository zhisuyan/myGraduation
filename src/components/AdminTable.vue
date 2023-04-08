<script setup>
import { ref, reactive } from 'vue';
import { createAxiosByinterceptors } from '../utils/net';
import { useRouter } from 'vue-router';
import { useAdminStore } from '../stores/admin';
import { storeToRefs } from 'pinia';

const adminStore = useAdminStore();
const { id, username, email, Isactive, power } = storeToRefs(adminStore);
const router = useRouter();
const currentRow = ref();
const dialogFormVisible = ref(false);
const formLabelWidth = '140px';

let form = reactive({
  username: '',
  password: '',
  email: '',
});
// 列表单选
const handleCurrentChange = val => {
  currentRow.value = val;
};

// 网络请求
const request = createAxiosByinterceptors({});
let apiData = ref([]);
let totalCount = ref(0);

function isIllegal(rule, value, callback) {
  const regex =
    /\>|\<|\/|\(|\)|\[|\]|\{|\}|\&lt;|\&gt;|\'|\"|\`|\~|\!|\#|\$|\%|\^|\&amp;|\*|\-|\+|\=|\||\\\:|\\\\/g;
  if (regex.test(value)) {
    callback(new Error('请勿输入非法字符!'));
  } else {
    callback();
  }
}

// 表单校验
const rules = reactive({
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

// 消息提示
function msg(message, type = 'error') {
  ElMessage({
    showClose: true,
    message: message,
    type: type,
    duration: 1000,
    offset: 450,
  });
}

// 获取列表信息
function getTableData() {
  return request
    .get(`/admin/adminList`)
    .then(response => {
      apiData.value = response.data.data;
      totalCount.value = response.data.dataCount;
      // 认证过期 跳转重新登陆
      const status = response.data.status;
      if (status === 401) {
        ElMessage({
          showClose: true,
          message: '身份认证已过期,请重新登陆',
          type: 'warning',
          duration: 2000,
          offset: 450,
        });
        setTimeout(() => {
          router.push({ path: '/login' });
        }, 1000);
      }
    })
    .catch(error => {
      console.log(error);
    });
}

// 状态格式化
function formatIsActive(row) {
  return row.Isactive === 1 ? '启用中' : '已冻结';
}

// 是否启用
function getIsActive(adminId) {
  if (id.value !== 1) {
    msg('你不是最高管理员,不能对管理员账号进行操作!');
  } else if (adminId === id.value) {
    msg('您不能冻结该账号!请联系开发人员进行操作!');
  } else {
    request
      .post(`/admin/isActive/${adminId}`)
      .then(response => {
        if (response.data.status === 401) {
          ElMessage({
            showClose: true,
            message: '身份认证已过期,请重新登陆',
            type: 'warning',
            duration: 2000,
            offset: 450,
          });
          form.Value = [];
          setTimeout(() => {
            router.push({ path: '/login' });
          }, 1000);
        } else {
          getTableData();
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}

// 删除管理员
function deleAdmin(index, row) {
  // 判断是否admin
  if (id.value !== 1) {
    msg('你不是最高管理员,不能对管理员账号进行操作!');
  } else if (row.Id === id.value) {
    // 判断是否删除自己

    msg('您不能删除该账号!请联系开发人员进行操作!');
  } else {
    request
      .delete(`/admin/deleAdmin/${row.Id}`)
      .then(response => {
        if (response.data.status === 401) {
          ElMessage({
            showClose: true,
            message: '身份认证已过期,请重新登陆',
            type: 'warning',
            duration: 2000,
            offset: 450,
          });
          form.Value = [];
          setTimeout(() => {
            router.push({ path: '/login' });
          }, 1000);
        } else {
          getTableData();
          ElMessage({
            type: 'success',
            message: '删除成功',
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}

// 确认删除
function confirmDele(index, row) {
  ElMessageBox.confirm('您确认删除该管理员吗', 'Warning', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      deleAdmin(index, row);
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      });
    });
}

// 添加管理员
function addAdmin() {
  if (id.value !== 1) {
    msg('你不是最高管理员,不能对管理员账号进行操作!');
  } else {
    request
      .post(`/admin/addAdmin/${form.username}/${form.password}/${form.email}`)
      .then(response => {
        if (response.data.status == 1) {
          ElNotification({
            title: '错误',
            message: '请检查内容的合法性!',
            type: 'error',
          });
        } else if (response.data.status == 402) {
          ElNotification({
            title: '错误',
            message: '该用户名已被占用',
            type: 'error',
          });
        } else if (response.data.status === 401) {
          ElMessage({
            showClose: true,
            message: '身份认证已过期,请重新登陆',
            type: 'warning',
            duration: 2000,
            offset: 450,
          });
          form.Value = [];
          setTimeout(() => {
            router.push({ path: '/login' });
          }, 1000);
        } else {
          dialogFormVisible.value = false;
          getTableData();
          (form.username = ''), (form.password = ''), (form.email = '');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}

// 页面第一次加载
getTableData();
</script>

<template>
  <div class="btns">
    <el-button type="warning" @click="getIsActive(currentRow.Id)"
      >启用/冻结</el-button
    >
    <el-button type="primary" @click="dialogFormVisible = true"
      >+ 添加管理员</el-button
    >
  </div>
  <!-- 表单内容 -->
  <el-dialog v-model="dialogFormVisible" title="添加管理员" align-center>
    <el-form :model="form" :rules="rules">
      <!-- username -->
      <el-form-item
        label="用户名"
        :label-width="formLabelWidth"
        prop="username">
        <el-input v-model="form.username" autocomplete="off" />
      </el-form-item>

      <!-- password -->
      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
        <el-input v-model="form.password" type="password" show-password />
      </el-form-item>

      <!-- email -->
      <el-form-item label="邮箱地址" :label-width="formLabelWidth" prop="email">
        <el-input v-model="form.email" autocomplete="off" />
      </el-form-item>
    </el-form>

    <!-- 确认/取消 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addAdmin"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>

  <el-table
    :data="apiData"
    :border="true"
    height="700"
    style="width: 95%"
    highlight-current-row
    @current-change="handleCurrentChange">
    <el-table-column prop="Id" label="id" width="180" align="center" sortable />
    <el-table-column
      prop="Username"
      label="用户名"
      width="180"
      align="center" />
    <el-table-column prop="Email" label="邮箱地址" align="center" />
    <el-table-column
      prop="Isactive"
      label="是否已启用"
      width="500"
      align="center"
      :formatter="formatIsActive" />
    <el-table-column fixed="right" label="操作" width="180" align="center">
      <template #default="scope">
        <el-button
          link
          type="danger"
          size="small"
          @click="confirmDele(scope.$index, scope.row)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>
.btns {
  margin-bottom: 40px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
