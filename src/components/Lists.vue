<script setup>
const ListData = [
  {
    id: 0,
    date: '2016-05-03',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 1,
    date: '2016-05-02',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 2,
    date: '2016-05-04',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 3,
    date: '2016-05-01',
    address: 'No. 189, Grove St, Los Angeles',
  },
];
</script>

<template>
  <!-- 文章列表 -->
  <div class="container-list">
    <ul class="list">
      <a :href="data.id" class="title" v-for="data in ListData" :key="data.id">
        <li>
          {{ data.address }}
          <span class="date">{{ data.date }}</span>
        </li>
      </a>
    </ul>
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
.title {
  width: 100%;
}
.date {
  float: right;
}
a:hover {
  color: #686de0;
}
</style>
