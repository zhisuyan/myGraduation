<script setup>
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue';

const input = ref('');
function shut() {
  console.log('@@');
}
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
        size="large">
        <template #append>
          <el-icon color="#4834d4 ">
            <el-button :icon="Search" />
          </el-icon>
        </template>
      </el-input>
    </div>

    <!-- 按钮 -->
    <button type="button" class="start" @click="shut">快速上手</button>
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
</style>
