<script setup>
import { reactive, ref } from 'vue';
// 引入组件
import Vue3Tinymce from '@jsdawn/vue3-tinymce';
// 控制台passive报错消除
import 'default-passive-events';

import { createAxiosByinterceptors } from '../utils/net';

const request = createAxiosByinterceptors({});
let apiData = ref([]);
const dialogFormVisible = ref(false);
const formLabelWidth = '140px';
const title = ref('');
const classOptions = [
  {
    value: 'law',
    label: '法律法规',
    children: [
      {
        value: 1,
        label: 1,
      },
      {
        value: 2,
        label: 2,
      },
      {
        value: 3,
        label: 3,
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
];

let Class = reactive({
  Value: 0,
});

const state = reactive({
  content: '',
  // editor 配置项
  setting: {
    height: 600, // editor 高度
    toolbar:
      'undo redo | fullscreen | blocks alignleft aligncenter alignright alignjustify | link unlink | numlist bullist | image media table | fontsize forecolor backcolor | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat |',
    toolbar_mode: 'sliding',
    quickbars_selection_toolbar:
      'removeformat | bold italic underline strikethrough | fontsize forecolor backcolor',
    plugins: 'link image media table lists fullscreen quickbars',
    font_size_formats: '12px 14px 16px 18px',
    link_default_target: '_blank',
    link_title: false,
    nonbreaking_force_tab: true,
    // 以中文简体为例
    language: 'zh-Hans',
    language_url:
      'https://unpkg.com/@jsdawn/vue3-tinymce@2.0.2/dist/tinymce/langs/zh-Hans.js',
  },
});

//富文本转义html
function html2Escape(str) {
  return str.replace(/[<>&"]/g, function (c) {
    return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c];
  });
}

// 网络请求
function upload(title, content, Class, subclass) {
  return request
    .post(
      `/admin/upload?title=${title}&content=${content}&class=${Class}&subclass=${subclass}`
    )
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
}

// 提交内容以及判断内容不为空
function confirmInput() {
  if (state.content && Class.Value && title.value) {
    dialogFormVisible.value = false;
    ElNotification({
      title: '上传成功',
      message: `文章《${title.value}》已经成功上传!`,
      type: 'success',
    });
    upload(title.value, state.content, Class.Value[0], Class.Value[1]);
    (state.content = ''), (Class.Value = 0), (title.value = '');
  } else {
    ElNotification({
      title: '上传失败',
      message: '填写内容不完整,请检查你的内容',
      type: 'error',
    });
  }
}
</script>

<template>
  <!-- 表单内容 -->
  <el-dialog v-model="dialogFormVisible" title="更改分类" align-center>
    <el-form :model="Class">
      <!-- username -->
      <el-form-item
        label="请选择分类"
        :label-width="formLabelWidth"
        prop="Class">
        <el-cascader
          :options="classOptions"
          clearable
          v-model="Class.Value"
          class="select-class" />
      </el-form-item>
    </el-form>

    <!-- 确认/取消 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmInput()"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>

  <el-input
    v-model="title"
    placeholder="请输入标题"
    clearable
    size="large"
    class="title-input" />

  <vue3-tinymce v-model="state.content" :setting="state.setting" />
  <el-button
    type="primary"
    size="large"
    class="update-btn"
    @click="dialogFormVisible = true"
    >上传文章</el-button
  >
</template>

<style scoped>
:deep(.el-input__wrapper) {
  border-radius: 10px;
}
.title-input {
  font-size: 18px;
  line-height: 20px;
  margin-bottom: 20px;
}

.update-btn {
  float: right;
  margin-top: 20px;
}
</style>
