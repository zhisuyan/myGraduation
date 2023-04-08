<script setup>
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { createAxiosByinterceptors } from '../utils/net';
import { useUserStore } from '../stores/user';
import { storeToRefs } from 'pinia';
import dayjs from 'dayjs';

const input = ref('');
const userStore = useUserStore();
const { id, username, email, points } = storeToRefs(userStore);
let searchListOpen = ref(true);
let apiData = ref('');
let isUser = ref(0);

const request = createAxiosByinterceptors({});

// UTC格式化
function formatTime(time) {
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss');
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
  if (!username.value) {
    isUser.value = 0;
  } else {
    isUser.value = 1;
  }
  return request
    .get(`/user/count/0/${isUser.value}/${id.value}`)
    .then(response => console.log(response))
    .catch(error => {
      console.log(error);
    });
}

function getArticleData() {
  return request
    .get(`/user/search/${input.value}`)
    .then(response => {
      apiData.value = response.data.data;
      searchListOpen.value = true;
    })
    .catch(error => {
      console.log(error);
    });
}
function hiddenList() {
  searchListOpen.value = false;
}
count();
</script>

<template>
  <section class="hero">
    <!-- 标题栏 -->
    <h1 class="tagline">
      <span class="accent"> 欢迎使用 </span>
      <br />
      <p class="title">软硬件信息安全资讯综合平台</p>
    </h1>

    <!-- 搜索框 -->
    <div class="search">
      <el-input
        v-model="input"
        placeholder="站内搜索"
        :clearable="true"
        @input="hiddenList"
        @keyup.enter="getArticleData"
        size="large">
        <template #append>
          <el-icon color="#4834d4 " @click.enter="getArticleData">
            <el-button :icon="Search" />
          </el-icon>
        </template>
      </el-input>
      <div class="search-list" v-show="searchListOpen">
        <ul>
          <router-link
            v-for="data in apiData"
            :to="'/ArticleList/Article/' + data.Id"
            :key="data.Id">
            <li class="item">
              <span class="list-title">{{ data.Title }}</span>
              <div style="flex-grow: 1"></div>
              <span class="date">{{ formatTime(data.Time) }}</span>
            </li></router-link
          >
        </ul>
      </div>
    </div>

    <!-- 按钮 -->
    <router-link to="/ArticleList/Article/58"
      ><button type="button" class="start" @click="shut">
        快速上手
      </button></router-link
    >
  </section>
</template>

<style scoped>
.hero {
  max-width: 1440px;
  /* background-color: skyblue; */
  padding: 96px 32px;
  box-sizing: border-box;
}

@media screen and (max-width: 960px) {
  .tagline {
    font-size: 64px !important;
  }
}

@media screen and (max-width: 768px) {
  .tagline {
    font-size: 48px !important;
  }
}

@media screen and (max-width: 370px) {
  .tagline {
    font-size: 36px !important;
  }
}
/* 标题栏 */
.tagline {
  font-size: 76px;
  text-align: center;
}
.accent {
  background-image: linear-gradient(to right bottom, #ff2b7d, #ffbe49);
  -webkit-background-clip: text;
  color: transparent;
}
.title {
  padding-top: 30px;
  color: #3c3c3c;
}

/* 搜索框 */
.search {
  max-width: 50%;
  min-width: 340px;
  margin: 50px auto;
  position: relative;
}

/* 按钮 */
.start {
  margin: 60px auto;
  width: 150px;
  height: 40px;
  display: block;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  padding: 8px 16px;
  color: #686de0;
}
.start:hover {
  background-color: #dfdfdf;
  cursor: pointer;
}
.search-list {
  position: absolute;
  background-color: #fff;
  width: 100%;
  max-height: 400px;
  overflow: auto;
  border-left: 1px solid #dfdfdf;
  /* border-bottom: 1px solid #dfdfdf; */
  border-right: 1px solid #dfdfdf;
}
.item {
  font-size: 14px;
  line-height: 40px;
  border-bottom: 1px solid #c3c3c3;
  padding-left: 20px;
  color: #686de0;
  display: flex;
}
.list-title {
  white-space: nowrap;
  /* 强制不换行 */
  text-overflow: ellipsis;
  /* 省略号 */
  overflow: hidden;
  /* 溢出隐藏 */
}
.title {
  width: 100%;
}
</style>
