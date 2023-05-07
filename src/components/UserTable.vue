<script setup>
import { ref, reactive } from 'vue';
import { createAxiosByinterceptors } from '../utils/net';
import { useRouter } from 'vue-router';

const currentRow = ref();
const dialogFormVisible = ref(false);
const resetFormVisible = ref(false);
const formLabelWidth = '140px';
const router = useRouter();

let form = reactive({
  username: '',
  password: '',
  email: '',
});

let pwdForm = reactive({
  id: '',
  password: '',
});

function isIllegal(rule, value, callback) {
  const regex =
    /\>|\<|\/|\(|\)|\[|\]|\{|\}|\&lt;|\&gt;|\'|\"|\`|\~|\!|\#|\$|\%|\^|\&amp;|\*|\-|\+|\=|\||\\\:|\\\\/g;
  if (regex.test(value)) {
    callback(new Error('请勿输入非法字符!'));
  } else {
    callback();
  }
}

// 列表单选
const handleCurrentChange = val => {
  currentRow.value = val;
};

// 网络请求
const request = createAxiosByinterceptors({});
let apiData = ref([]);
let totalCount = ref(0);

// 表单校验
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度应为3~8', trigger: 'blur' },
    { validator: isIllegal, trigger: ['blur', 'change'] },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 18, message: '长度应为6~14', trigger: 'blur' },
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

const pwdRules = reactive({
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 18, message: '长度应为6~14', trigger: 'blur' },
    { validator: isIllegal, trigger: ['blur', 'change'] },
  ],
});

// 获取列表信息
function getTableData() {
  return request
    .get(`/admin/userList`)
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

// 删除用户
function deleUser(index, row) {
  request
    .delete(`/admin/deleUser/${row.Id}`)
    .then(response => {
      if (response.data.status === 401) {
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
      } else {
        getTableData();
      }
    })
    .catch(error => {
      console.log(error);
    });
}

// 确认删除
function confirmDele(index, row) {
  ElMessageBox.confirm('您确认删除该用户吗', 'Warning', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      deleUser(index, row);
      ElMessage({
        type: 'success',
        message: '删除成功',
      });
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      });
    });
}

// 更改积分
function modifyPoints(index, row, value) {
  request
    .post(`/admin/modifyPoints/${row.Id}/${value}`)
    .then(response => {
      getTableData();
    })
    .catch(error => {
      console.log(error);
    });
}

// 输入积分
function getPoints(index, row) {
  ElMessageBox.prompt('请输入你要更改的大小', '更改积分', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputPattern: /^[0-9]*$/,
    inputErrorMessage: '请输入合法数字!',
  })
    .then(({ value }) => {
      modifyPoints(index, row, value);
      ElMessage({
        type: 'success',
        message: `积分更改成功`,
      });
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '操作取消',
      });
    });
}

// 更改密码
function resetPwd() {
  request
    .post(`/admin/resetUserPwd/${pwdForm.id}/${pwdForm.password}`)
    .then(response => {
      if (response.data.status == 401) {
        ElMessage({
          showClose: true,
          message: '身份认证已过期,请重新登陆',
          type: 'warning',
          duration: 2000,
          offset: 450,
        });
        (pwdForm.id = ''), (pwdForm.password = '');
      } else {
        ElMessage({
          showClose: true,
          message: '用户密码重置成功!',
          type: 'success',
          duration: 2000,
          offset: 450,
        });
        resetFormVisible.value = false;
        getTableData();
        (pwdForm.id = ''), (pwdForm.password = '');
      }
    })
    .catch(error => {
      console.log(error);
    });
}

// 添加用户
function addUser() {
  request
    .post(
      `/admin/addUser/${encodeURIComponent(form.username).replace(
        /\%u/g,
        '/u'
      )}/${form.password}/${form.email}`
    )
    .then(response => {
      if (response.data.status == 1) {
        console.log(response);
        ElNotification({
          title: '错误',
          message: '请检查内容的合法性!',
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
        (form.username = ''), (form.password = ''), (form.email = '');
      } else if (response.data.status == 402) {
        ElNotification({
          title: '错误',
          message: '该用户名已被占用',
          type: 'error',
        });
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

// 页面第一次加载
getTableData();
</script>

<template>
  <div class="btns">
    <el-button type="primary" @click="dialogFormVisible = true"
      >+ 添加用户</el-button
    >
  </div>
  <!-- 表单内容 -->
  <el-dialog v-model="dialogFormVisible" title="添加用户" align-center>
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
        <el-button type="primary" @click="addUser()"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 重置密码 -->
  <!-- 表单内容 -->
  <el-dialog v-model="resetFormVisible" title="重置密码" align-center>
    <el-form :model="pwdForm" :rules="pwdRules">
      <!-- password -->
      <el-form-item
        label="新密码"
        :label-width="formLabelWidth"
        prop="password">
        <el-input v-model="pwdForm.password" type="password" show-password />
      </el-form-item>
    </el-form>

    <!-- 确认/取消 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button
          @click="
            (resetFormVisible = false),
              (pwdForm.id = ''),
              (pwdForm.password = '')
          "
          >取消</el-button
        >
        <el-button type="primary" @click="resetPwd()"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 数据表格 -->
  <el-table
    :data="apiData"
    :border="true"
    height="700"
    style="width: 95%"
    highlight-current-row
    @current-change="handleCurrentChange">
    <el-table-column prop="Id" label="id" width="200" align="center" sortable />
    <el-table-column
      prop="Username"
      label="用户名"
      width="220"
      align="center" />
    <el-table-column prop="Email" label="邮箱地址" align="center" />
    <el-table-column
      prop="Lastlogin"
      label="上次登陆时间"
      width="300"
      align="center"
      sortable />
    <el-table-column
      prop="Points"
      label="积分"
      align="center"
      width="200"
      sortable />
    <el-table-column fixed="right" label="操作" width="270" align="center">
      <template #default="scope">
        <el-button
          link
          type="danger"
          size="small"
          @click="confirmDele(scope.$index, scope.row)">
          删除
        </el-button>
        <el-button
          link
          type="primary"
          size="small"
          @click="getPoints(scope.$index, scope.row)">
          更改积分
        </el-button>
        <el-button
          link
          type="warning"
          size="small"
          @click="(resetFormVisible = true), (pwdForm.id = scope.row.Id)">
          重置密码
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
