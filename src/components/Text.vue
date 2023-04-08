<script setup>
import { ref, reactive } from 'vue';
import { createAxiosByinterceptors } from '../utils/net';
import { useUserStore } from '../stores/user';
import { storeToRefs } from 'pinia';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
const { id, username, email, points } = storeToRefs(userStore);
const { Id } = defineProps(['Id']);
const downloadURL = ref('');
let isUser = ref(0);

let html = ref('');
let title = ref('');
let time = ref('');
let address = ref('');
let api = reactive({});
const request = createAxiosByinterceptors({});
function msg(message = '若要复制该文本请登录!', type = 'error') {
  ElMessage({
    showClose: true,
    message: message,
    type: type,
    duration: 1000,
    offset: 450,
  });
}

function testToken() {
  return request
    .get(`/userCtrl/testToken`)
    .then(response => {
      if (response.data.status === 401) {
        (id.value = ''),
          (username.value = ''),
          (email.value = ''),
          (points.value = 0);
      }
    })
    .catch(error => {
      console.log(error);
    });
}

async function count() {
  await testToken();
  if (username.value === '') {
    isUser.value = 0;
  } else {
    isUser.value = 1;
  }
  return request
    .get(`/user/count/${Id}/${isUser.value}`)
    .then()
    .catch(error => {
      console.log(error);
    });
}

function getArticleData() {
  return request
    .get(`/user/articles/${Id}`)
    .then(response => {
      html.value = response.data.data;
      title.value = response.data.title;
      time.value = response.data.time;
      address.value = response.data.address;
      downloadURL.value = `http://127.0.0.1:3000/word/${address.value}`;
    })
    .catch(error => {
      console.log(error);
    });
}

function buyArticle() {
  return request
    .post(`/userCtrl/buyArticle/${id.value}/${title.value}`)
    .then(response => {
      api = response.data;
      if (api.status === 0) {
        msg('文章购买成功,正在下载...');
        window.open(downloadURL.value, '_self');
        points.value -= 10;
      } else if (api.status === 101) {
        window.open(downloadURL.value, '_self');
      } else if (api.status === 401) {
        msg('登陆已过期,请重新登录');
        (id.value = ''),
          (username.value = ''),
          (email.value = ''),
          (points.value = 0);
        router.go(0);
      } else if (api.status === 1) {
        errMsg('购买失败,请稍后再试');
      }
    })
    .catch(error => {
      console.log(error);
    });
}

function checkLogin() {
  console.log('@@');
  console.log(username.value);
  if (username.value == '') {
    // 禁止右键菜单
    document.oncontextmenu = function () {
      return false;
    };
    // 禁止文字选择
    // document.onselectstart = function () {
    //   return false;
    // };
    // 禁止复制
    document.oncopy = function () {
      msg();
      return false;
    };
    // 禁止剪切
    document.oncut = function () {
      msg();
      return false;
    };
  }
}

function downloadFile() {
  if (username.value == '') {
    msg('用户请先登录');
  } else if (points.value < 10) {
    msg('积分余额不足');
  } else {
    buyArticle();
  }
}

getArticleData();
checkLogin();
count();
</script>

<template>
  <div class="detail" id="detail">
    <h2>{{ title }}</h2>
    <div class="art-palette">{{ time }}</div>
    <div class="text" v-html="html"></div>
    <div class="download" @click="downloadFile">点此下载原文---10积分</div>
  </div>
</template>

<style scoped>
.detail {
  padding-top: 20px;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 40px;
}
h2 {
  margin-top: 52px;
}
p {
  font-weight: 200;
  padding-bottom: 25px;
  line-height: 26px;
}
.art-palette {
  color: #666;
  font-size: 14px;
  padding: 20px 0;
  border-bottom: 1px solid #e4e4e4;
}
.text {
  padding-top: 40px;
  padding-bottom: 20px;
}
.download {
  padding-top: 30px;
  padding-left: 20px;
  color: red;
  cursor: pointer;
}
</style>
