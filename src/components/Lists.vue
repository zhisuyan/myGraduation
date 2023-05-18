<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { createAxiosByinterceptors } from '../utils/net';
import dayjs from 'dayjs';

const route = useRoute();
let { Class, count, subclass } = route.params;

let pageSize = ref(parseInt(count));
let apiData = ref('');
let totalCount = ref(0);
const currentPage = ref(1);

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
      (id.value = ''),
        (username.value = ''),
        (email.value = ''),
        (points.value = 0);
    });
}
// 网络请求
function getListData(Class, start, count, subclass) {
  return request
    .get(`/user/lists/${Class}/${start}/${count}/${subclass}`)
    .then(response => {
      apiData.value = response.data.data;
      totalCount.value = response.data.dataCount;
    })
    .catch(error => {
      console.log(error);
    });
}
// 第一次进入页面发送网络请求
// getListData('law', 0, 10);
getListData(Class, 0, count, subclass);

// 当页码发生改变时需要发送网络请求
function handleCurrentChange() {
  //页码发生变化
  getListData(Class, (currentPage.value - 1) * count, count, subclass);
  console.log(currentPage.value);
}

testToken();
</script>

<template>
  <!-- 文章列表 -->

  <div class="container-list">
    <ul class="list">
      <router-link
        class="title"
        v-for="data in apiData"
        :to="'/ArticleList/Article/' + data.Id"
        :key="data.Id">
        <li>
          <span class="list-title">{{ data.Title }}</span>
          <span class="date">{{ formatTime(data.Time) }}</span>
        </li>
      </router-link>
    </ul>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="totalCount"
        @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<style scoped>
.container-list {
  /* border: 1px solid #fff; */
  max-width: 940px;
  min-width: 350px;
  margin: 0 auto;
  box-shadow: 0 0 10px #aaa;
  background-color: #fff;
}
.list {
  padding-top: 20px;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 40px;
}
.list li {
  box-sizing: border-box;
  height: 60px;
  line-height: 60px;
  font-weight: 300;
  font-size: 14px;
  border-bottom: 1px solid #e4e4e4;
}
.list li .list-title {
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
.date {
  float: right;
}
a:hover {
  color: #686de0;
}

.pagination {
  text-align: -webkit-center;
  padding-top: 12px;
  padding-bottom: 30px;
}
</style>
