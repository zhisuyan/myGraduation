<script setup>
import { ref, reactive, onMounted } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { createAxiosByinterceptors } from '../utils/net';
import dayjs from 'dayjs';

const request = createAxiosByinterceptors({});
const input = ref('');
let searchListOpen = ref(false);
let apiData = ref('');

let softwareData = ref('');
let hardwareData = ref('');
let GDPRData = ref('');
let DataSafeData = ref('');
let MsgSafeData = ref('');
let StandardData = ref('');
// UTC格式化
function formatTime(time) {
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss');
}

// 搜索功能
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

function getSoftwareNews() {
  return request
    .get(`/user/getSoftwareNews`)
    .then(response => {
      softwareData.value = response.data.data;
    })
    .catch(error => {
      console.log(error);
    });
}

function getHardwareNews() {
  return request
    .get(`/user/getHardwareNews`)
    .then(response => {
      hardwareData.value = response.data.data;
    })
    .catch(error => {
      console.log(error);
    });
}

function getGDPRData() {
  return request
    .get(`/user/getLawOne`)
    .then(response => {
      GDPRData.value = response.data.data;
    })
    .catch(error => {
      console.log(error);
    });
}

function getDataSafeData() {
  return request
    .get(`/user/getLawTwo`)
    .then(response => {
      DataSafeData.value = response.data.data;
    })
    .catch(error => {
      console.log(error);
    });
}

function getMsgSafeData() {
  return request
    .get(`/user/getLawThree`)
    .then(response => {
      MsgSafeData.value = response.data.data;
    })
    .catch(error => {
      console.log(error);
    });
}

function getStandardData() {
  return request
    .get(`/user/getLawFour`)
    .then(response => {
      StandardData.value = response.data.data;
    })
    .catch(error => {
      console.log(error);
    });
}
async function getNews() {
  getSoftwareNews();
  getHardwareNews();
  getGDPRData();
  getDataSafeData();
  getMsgSafeData();
  await getStandardData();
}

onMounted(() => {
  getNews();
});
</script>

<template>
  <div class="module-title">更多分类</div>

  <!-- 搜索框 -->
  <div class="search">
    <el-input
      v-model="input"
      placeholder="没有找到想要的?来这里搜下吧!"
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

  <div class="news-list">
    <div class="card-list">
      <ul>
        <div class="title">
          <router-link to="/ArticleList/software/10/0">
            <span class="type">软件</span><span class="more">查看更多</span>
          </router-link>
        </div>
        <router-link
          class="news-item"
          v-for="data in softwareData"
          :to="'/ArticleList/Article/' + data.Id"
          :key="data.Id">
          <li>
            <span>{{ formatTime(data.Time) }}</span
            >{{ data.Title }}
          </li>
        </router-link>
      </ul>
    </div>

    <div class="card-list">
      <ul>
        <div class="title">
          <router-link to="/ArticleList/hardware/10/0"
            ><span class="type">硬件</span
            ><span class="more">查看更多</span></router-link
          >
        </div>
        <router-link
          class="news-item"
          v-for="data in hardwareData"
          :to="'/ArticleList/Article/' + data.Id"
          :key="data.Id">
          <li>
            <span>{{ formatTime(data.Time) }}</span
            >{{ data.Title }}
          </li>
        </router-link>
      </ul>
    </div>

    <div class="card-list">
      <ul>
        <div class="title">
          <router-link to="/ArticleList/law/10/1">
            <span class="type">GDPR-通用数据保护条例</span
            ><span class="more">查看更多</span>
          </router-link>
        </div>
        <router-link
          class="news-item"
          v-for="data in GDPRData"
          :to="'/ArticleList/Article/' + data.Id"
          :key="data.Id">
          <li>
            <span>{{ formatTime(data.Time) }}</span
            >{{ data.Title }}
          </li>
        </router-link>
      </ul>
    </div>

    <div class="card-list">
      <ul>
        <div class="title">
          <router-link to="/ArticleList/law/10/2"
            ><span class="type">网络安全与数据安全</span
            ><span class="more">查看更多</span></router-link
          >
        </div>
        <router-link
          class="news-item"
          v-for="data in DataSafeData"
          :to="'/ArticleList/Article/' + data.Id"
          :key="data.Id">
          <li>
            <span>{{ formatTime(data.Time) }}</span
            >{{ data.Title }}
          </li>
        </router-link>
      </ul>
    </div>

    <div class="card-list">
      <ul>
        <div class="title">
          <router-link to="/ArticleList/law/10/3"
            ><span class="type">信息安全管理</span
            ><span class="more">查看更多</span></router-link
          >
        </div>
        <router-link
          class="news-item"
          v-for="data in MsgSafeData"
          :to="'/ArticleList/Article/' + data.Id"
          :key="data.Id">
          <li>
            <span>{{ formatTime(data.Time) }}</span
            >{{ data.Title }}
          </li>
        </router-link>
      </ul>
    </div>

    <div class="card-list">
      <ul>
        <div class="title">
          <router-link to="/ArticleList/law/10/4"
            ><span class="type">行业标准</span
            ><span class="more">查看更多</span></router-link
          >
        </div>
        <router-link
          class="news-item"
          v-for="data in StandardData"
          :to="'/ArticleList/Article/' + data.Id"
          :key="data.Id">
          <li>
            <span>{{ formatTime(data.Time) }}</span
            >{{ data.Title }}
          </li>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
  background-color: #fff;
  display: inline-block;
}
ul li {
  line-height: 24px;
}
.news-item,
.news-item:active {
  padding: 5px;
  color: #3c3c3c;
  text-decoration: none;
  display: block;
}
.news-item:hover {
  color: #4834d4;
}
.news-item span {
  float: right;
}

/* 通用 */
.news-list {
  overflow: hidden;
  padding-bottom: 90px;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin-left: 10px;
}
.card-list {
  flex: 1;
  width: 600px;
  padding-top: 40px;
}
.card-list ul {
  margin-top: 10px;
  border-radius: 15px;
  padding: 10px;
  width: 100%;
  /* width: 45%; */
  min-width: 600px;
  width: 50%;
}

.type {
  color: #ff2b7d;
  font-size: 20px;
}
.title {
  width: 100%;
}
.more {
  float: right;
  font-size: 14px;
  cursor: pointer;
  line-height: 20px;
  color: skyblue;
}
.more:hover {
  color: #4834d4;
}
/* module-title */
.module-title {
  font-size: 56px;
  background-image: linear-gradient(to right bottom, #ff2b7d, #ffbe49);
  -webkit-background-clip: text;
  color: transparent;
  padding-bottom: 20px;
}
/* 搜索框 */
.search {
  max-width: 50%;
  min-width: 340px;
  margin: 10px auto;
  position: relative;
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
  width: calc(100%);
  font-size: 14px;
  line-height: 40px;
  border-bottom: 1px solid #c3c3c3;
  padding-left: 20px;
  color: #686de0;
  display: flex;
}
.list-title {
  /* white-space: nowrap; */
  /* 强制不换行 */
  text-overflow: ellipsis;
  /* 省略号 */
  overflow: hidden;
  /* 溢出隐藏 */
}
/* software */
@media screen and (max-width: 1270px) {
  .news-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 960px;
    justify-content: center;
  }
}
@media screen and (max-width: 960px) {
  .news-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 960px;
  }
}
@media screen and (max-width: 550px) {
  .card-list ul {
    min-width: 350px;
  }
}
</style>
