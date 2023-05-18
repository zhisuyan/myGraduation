<script setup>
import { ref } from 'vue';
import { createAxiosByinterceptors } from '../utils/net';
import { useUserStore } from '../stores/user';
import { storeToRefs } from 'pinia';
import dayjs from 'dayjs';

const userStore = useUserStore();
const { id, username, email, points } = storeToRefs(userStore);

let latestNews = ref('');
let first15 = ref([]);
let last15 = ref([]);
let isUser = ref(0);

const request = createAxiosByinterceptors({});

function getLatest() {
  return request
    .get(`/user/getLatest`)
    .then(response => {
      latestNews.value = response.data.data;
      first15.value = latestNews.value.slice(0, 15);
      last15.value = latestNews.value.slice(15);
    })
    .catch(error => {
      console.log(error);
    });
}

// 测试用户是否是登录用户，若是则会拉取用户数据
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

// 统计访客流量
async function count() {
  await testToken();
  if (!username.value) {
    isUser.value = 0;
  } else {
    isUser.value = 1;
  }
  return request
    .get(`/user/count/0/${isUser.value}/${id.value}`)
    .then(response => response)
    .catch(error => {
      console.log(error);
    });
}
getLatest();
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

    <!-- 新闻栏 -->
    <div class="news">
      <div>
        <span class="type">最新资讯</span>
      </div>
      <div class="lists">
        <div class="list">
          <ul class="list-left">
            <router-link
              v-for="data in first15"
              :to="'/ArticleList/Article/' + data.Id"
              :key="data.Id">
              <li>
                <span class="news-title">{{ data.Title }}</span>
              </li>
            </router-link>
          </ul>
        </div>
        <div class="list">
          <ul class="list-right">
            <router-link
              v-for="data in last15"
              :to="'/ArticleList/Article/' + data.Id"
              :key="data.Id">
              <li>
                <span>{{ data.Title }}</span>
              </li>
            </router-link>
          </ul>
        </div>
      </div>
    </div>

    <!-- 按钮 -->
    <router-link to="/ArticleList/Article/58">
      <button type="button" class="start" @click="shut">快速上手</button>
    </router-link>
  </section>
</template>

<style scoped>
.hero {
  max-width: 1440px;
  padding: 96px 32px;
  box-sizing: border-box;
  padding-bottom: 0px;
}

@media screen and (max-width: 960px) {
  .tagline {
    font-size: 64px !important;
  }
  .lists {
    flex-direction: column;
  }
  .list-left a:nth-child(odd) {
    color: #fda085;
  }
  .list-right a:nth-child(even) {
    color: #fda085;
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
/* 新闻栏 */
.news {
  margin: 0 auto;
  margin-top: 40px;
  background-color: #fff;
  max-width: 1100px;
  border-radius: 8px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
}
.type {
  color: #ff2b7d;
  font-size: 20px;
}
.lists {
  padding-top: 20px;
  display: flex;
}
.list {
  flex: 1;
  flex-basis: auto;
  line-height: 26px;
  font-size: 16px;
  min-width: 0;

  white-space: normal;
  /* 文本溢出显示省略号 */
  text-overflow: ellipsis;
  /* 溢出部分隐藏 */
  overflow: hidden;
}
.list li:hover {
  color: #4834d4;
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
