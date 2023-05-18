<script setup>
import { ref, reactive } from 'vue';
import { createAxiosByinterceptors } from '../utils/net';
import { ElMessage, ElMessageBox, genFileId } from 'element-plus';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';

const router = useRouter();
const currentRow = ref();
const uploadFormVisible = ref(false);
const dialogFormVisible = ref(false);
const formLabelWidth = '140px';

let form = reactive({
  Value: [],
});

let uploadForm = reactive({
  Class: [],
  Title: '',
});

const rules = reactive({
  Title: [
    { required: true, message: '请输入文章标题', trigger: 'blur' },
    { min: 4, max: 30, message: '标题长度应为4~30', trigger: 'blur' },
  ],
  Class: [{ required: true, message: '请选择文章类别', trigger: 'blur' }],
});

// 文件上传
const upload = ref();
let headers = ref({});
let token = window.sessionStorage.getItem('adminToken');
headers.value.Authorization = JSON.parse(token);
const handleExceed = files => {
  upload.value.clearFiles();
  const file = files[0];
  file.uid = genFileId();
  upload.value.handleStart(file);
};

function handleError(err) {
  console.log(err, 'Err');
}

let Address;
function handleSuccess(res) {
  Address = res.src;
  console.log(Address);
}
function submitUpload() {
  upload.value.submit();
}

// 级联选择器
const classOptions = [
  {
    value: 'law',
    label: '法律法规',
    children: [
      {
        value: 1,
        label: 'GDPR-通用数据保护条例',
      },
      {
        value: 2,
        label: '网络安全与数据安全',
      },
      {
        value: 3,
        label: '信息安全管理',
      },
      {
        value: 4,
        label: '行业标准',
      },
    ],
  },
  {
    value: 'software',
    label: '软件相关',
  },
  {
    value: 'hardware',
    label: '硬件相关',
  },
  {
    value: 'guidance',
    label: '新手引导',
  },
];

// 筛选函数
const filterHandler = (value, row, column) => {
  const property = column['property'];
  if (row[property] === value) {
    return row;
  }
};

// 列表单选
const handleCurrentChange = val => {
  currentRow.value = val;
};

// 网络请求
const request = createAxiosByinterceptors({});
let apiData = ref([]);
let totalCount = ref(0);

// 获取列表信息
function getTableData() {
  return request
    .get(`/admin/getAllLists`)
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

// 类别格式化
function formatClass(row) {
  switch (row.Class) {
    case 'law':
      return '法律法规';
    case 'software':
      return '软件相关';
    case 'hardware':
      return '硬件相关';
    case 'guidance':
      return '新手引导';
    default:
      return '未格式该类别';
  }
}

function formatIsfree(row) {
  switch (row.Isfree) {
    case 0:
      return '付费资源';
    case 1:
      return '免费资源';
    default:
      return '未格式该类别';
  }
}

function formatSubclass(row) {
  switch ((row.Class, row.SubClass)) {
    case ('law', 1):
      return 'GDPR-通用数据保护条例';
    case ('law', 2):
      return '网络安全与数据安全';
    case ('law', 3):
      return '信息安全管理';
    case ('law', 4):
      return '行业标准';
    default:
      return '无';
  }
}

// UTC格式化
function formatTime(row) {
  return dayjs(row.Time).format('YYYY-MM-DD HH:mm:ss');
}

// 删除文章
function deleArticle(index, row) {
  request
    .post(`/admin/deleArticle/${row.Id}`)
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
  ElMessageBox.confirm('您确认删除该文章吗', 'Warning', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      deleArticle(index, row);
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

// 更改分类
function changeClass() {
  dialogFormVisible.value = false;
  if (form.Value[1] == undefined) {
    request
      .post(`/admin/changeClass/${currentRow.value.Id}/${form.Value[0]}`)
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
          form.Value = [];
        }
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    request
      .post(
        `/admin/changeClass/${currentRow.value.Id}/${form.Value[0]}/${form.Value[1]}`
      )
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
          form.Value = [];
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}

// 更改资源类别
// 是否启用
function changeIsfree(index, row) {
  request
    .post(`/admin/changeIsfree/${row.Id}`)
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

// 转义斜杠
function escapeSlash(str) {
  const regex = /\//g;
  return str.replace(regex, '%2F');
}

// 上传文章
async function uploadArticle() {
  uploadFormVisible.value = false;

  if (uploadForm.Class[1] === undefined) {
    request
      .post(
        `/admin/upload/${uploadForm.Title}/${escapeSlash(Address)}/${
          uploadForm.Class[0]
        }`
      )
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
          ElNotification({
            title: '上传成功',
            message: `文章《${uploadForm.Title}》已经成功上传!`,
            type: 'success',
          });
          getTableData();
          uploadForm.Title = '';
          uploadForm.Class = [];
          upload.value.clearFiles();
          console.log(response);
        }
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    request
      .post(
        `/admin/upload/${uploadForm.Title}/${escapeSlash(Address)}/${
          uploadForm.Class[0]
        }/${uploadForm.Class[1]}`
      )
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
          ElNotification({
            title: '上传成功',
            message: `文章《${uploadForm.Title}》已经成功上传!`,
            type: 'success',
          });
          getTableData();
          uploadForm.Title = '';
          uploadForm.Class = [];
          upload.value.clearFiles();
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
  <h3 class="total-count">文章总数为:{{ totalCount }}</h3>

  <el-button
    type="primary"
    size="large"
    class="update-btn"
    @click="uploadFormVisible = true"
    >添加文章</el-button
  >

  <!-- 表单内容 上传文章-->
  <el-dialog v-model="uploadFormVisible" title="文章上传" align-center>
    <el-form :model="uploadForm" label-position="top" :rules="rules">
      <el-form-item label="标题" :label-width="formLabelWidth" prop="Title">
        <el-input
          v-model="uploadForm.Title"
          placeholder="Please input"
          clearable />
      </el-form-item>

      <!-- 选择分类 -->
      <el-form-item label="分类选择" :label-width="formLabelWidth" prop="Class">
        <el-cascader
          :options="classOptions"
          clearable
          v-model="uploadForm.Class" />
      </el-form-item>

      <el-form-item label="文件上传" :label-width="formLabelWidth">
      </el-form-item>
      <el-upload
        ref="upload"
        class="upload-demo"
        action="http://localhost:3000/admin/uploadFile"
        accept=".doc .docx"
        :headers="headers"
        :limit="1"
        :on-exceed="handleExceed"
        :on-error="handleError"
        :on-success="handleSuccess"
        :auto-upload="true">
        <template #trigger>
          <el-button type="primary">select file</el-button>
        </template>
      </el-upload>
    </el-form>

    <!-- 确认/取消 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="uploadFormVisible = false">取消</el-button>
        <el-button type="primary" @click="uploadArticle()"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 表单内容 更改分类-->
  <el-dialog v-model="dialogFormVisible" title="更改分类" align-center>
    <el-form :model="form">
      <el-form-item label="请选择分类" :label-width="formLabelWidth">
        <el-cascader :options="classOptions" clearable v-model="form.Value" />
      </el-form-item>
    </el-form>

    <!-- 确认/取消 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="changeClass()"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 
    id,标题,类别,子类别,标题,时间,操作
   -->
  <!-- 数据表格 -->
  <el-table
    :data="apiData"
    :border="true"
    height="700"
    style="width: 95%"
    highlight-current-row
    @current-change="handleCurrentChange"
    class="data-table">
    <el-table-column prop="Id" label="id" width="100" align="center" sortable />
    <el-table-column prop="Title" label="文章标题" align="center" />
    <el-table-column
      prop="Class"
      label="分类"
      width="100"
      align="center"
      :formatter="formatClass"
      :filters="[
        { text: '法律法规', value: 'law' },
        { text: '软件相关', value: 'software' },
        { text: '硬件相关', value: 'hardware' },
        { text: '新手引导', value: 'guidance' },
      ]"
      :filter-method="filterHandler" />
    <el-table-column
      prop="SubClass"
      label="子类别"
      width="200"
      align="center"
      :formatter="formatSubclass"
      sortable />
    <el-table-column
      prop="Time"
      label="更新时间"
      align="center"
      width="250"
      :formatter="formatTime"
      sortable />
    <el-table-column
      prop="Isfree"
      label="付费资源"
      width="150"
      align="center"
      :formatter="formatIsfree"
      sortable />
    <el-table-column fixed="right" label="操作" width="250" align="center">
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
          @click="(dialogFormVisible = true), (currentRow = scope.row)">
          更改分类
        </el-button>
        <el-button
          link
          type="warning"
          size="small"
          @click="changeIsfree(scope.$index, scope.row)">
          更改资源类别
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>
.total-count {
  margin-bottom: 40px;
  color: white;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.total-count {
  float: left;
  margin-bottom: 65px;
}
.update-btn {
  float: right;
  margin-right: 85px;
}
</style>
