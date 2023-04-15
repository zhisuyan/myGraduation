<script setup>
import { ref, reactive } from 'vue';
import { createAxiosByinterceptors } from '../utils/net';
import { useUserStore } from '../stores/user';
import { storeToRefs } from 'pinia';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';

const router = useRouter();
const userStore = useUserStore();
const { id, username, email, points } = storeToRefs(userStore);
const { Id } = defineProps(['Id']);
const downloadURL = ref('');
let isUser = ref(0);
let net = ref(false);

let html = ref('');
let title = ref('');
let time = ref('');
let isfree = ref('');
let address = ref('');
let api = reactive({});
let before = ref('');
let after = ref('');
let beforePath = ref('');
let afterPath = ref('');
const request = createAxiosByinterceptors({});

function formatTime(time) {
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss');
}

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

async function getArticleData() {
  await request
    .get(`/user/articles/${Id}`)
    .then(response => {
      html.value = response.data.data;
      title.value = response.data.title;
      time.value = response.data.time;
      address.value = response.data.address;
      isfree.value = response.data.isfree;
      net.value = true;
      if (!response.data.before) {
        after.value = response.data.after;
        afterPath.value = `/ArticleList/Article/${after.value.Id}`;
      } else if (!response.data.after) {
        before.value = response.data.before;
        beforePath.value = `/ArticleList/Article/${before.value.Id}`;
      } else {
        before.value = response.data.before;
        after.value = response.data.after;
        beforePath.value = `/ArticleList/Article/${before.value.Id}`;
        afterPath.value = `/ArticleList/Article/${after.value.Id}`;
      }

      downloadURL.value = `http://127.0.0.1:3000/word/${address.value}`;
      document.title = title.value;
    })
    .catch(error => {
      console.log(error);
    });
}

async function buyArticle() {
  await request
    .post(`/userCtrl/buyArticle/${id.value}/${title.value}`)
    .then(response => {
      api = response.data;
      if (api.status === 0) {
        msg('文章正在下载...');
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
        msg('购买失败,请稍后再试');
        console.log(response);
      }
    })
    .catch(error => {
      console.log(error);
    });
}

function checkLogin() {
  if (username.value == '') {
    // 禁止右键菜单
    document.oncontextmenu = function () {
      return false;
    };
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

function downloadFileFree() {
  if (username.value == '') {
    msg('登录即可下载该文章!');
  } else {
    buyArticle();
  }
}

async function action() {
  if (isfree.value) {
    await getArticleData();
    checkLogin();
    count();
  } else {
    await getArticleData();
    count();
  }
}
action();
</script>

<template>
  <el-skeleton :rows="15" animated v-if="!net" />
  <div class="detail" id="detail" v-else-if="net">
    <h2>{{ title }}</h2>
    <div class="art-palette">{{ formatTime(time) }}</div>
    <div class="text" v-html="html"></div>
    <div class="download" @click="downloadFile" v-if="!isfree">
      点此下载原文---10积分
    </div>
    <div class="download" @click="downloadFileFree" v-else-if="isfree">
      点此下载原文
    </div>
    <div class="context">
      <router-link :to="beforePath"
        ><div class="before content" v-show="before.Title">
          <span class="go">上一篇</span>
          <div class="title">{{ before.Title }}</div>
        </div></router-link
      >

      <div class="flex-grow" />
      <router-link :to="afterPath">
        <div class="after content" v-show="after.Title">
          <span class="go">下一篇</span>
          <div class="title">{{ after.Title }}</div>
        </div>
      </router-link>
    </div>
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
  padding-bottom: 40px;
}
.context {
  display: flex;
  padding-top: 30px;
  border-top: 1px solid #e4e4e4;
}
@media screen and (max-width: 600px) {
  .content {
    width: 100px;
  }
  .title {
    text-align: left;
  }
}

.flex-grow {
  flex-grow: 1;
}
.go {
  color: #686de0;
}
.title {
  margin-top: 16px;
  font-size: 14px;
}

.after {
  text-align: right;
}
</style>
