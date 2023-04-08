<script setup>
import ContentPage from '../../components/ContentPage.vue';
import NewsList from '../../components/NewsList.vue';

document.title = '软硬件信息安全资讯综合平台';
</script>

<template>
  <!-- 巨幅 -->
  <div class="container">
    <ContentPage />
  </div>

  <!-- 波浪 -->
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="wave">
    <path
      fill="#fff"
      fill-opacity="1"
      d="M0,32L15,74.7C30,117,60,203,90,218.7C120,235,150,181,180,176C210,171,240,213,270,240C300,267,330,277,360,256C390,235,420,181,450,149.3C480,117,510,107,540,128C570,149,600,203,630,208C660,213,690,171,720,144C750,117,780,107,810,133.3C840,160,870,224,900,234.7C930,245,960,203,990,160C1020,117,1050,75,1080,64C1110,53,1140,75,1170,117.3C1200,160,1230,224,1260,213.3C1290,203,1320,117,1350,101.3C1380,85,1410,139,1425,165.3L1440,192L1440,0L1425,0C1410,0,1380,0,1350,0C1320,0,1290,0,1260,0C1230,0,1200,0,1170,0C1140,0,1110,0,1080,0C1050,0,1020,0,990,0C960,0,930,0,900,0C870,0,840,0,810,0C780,0,750,0,720,0C690,0,660,0,630,0C600,0,570,0,540,0C510,0,480,0,450,0C420,0,390,0,360,0C330,0,300,0,270,0C240,0,210,0,180,0C150,0,120,0,90,0C60,0,30,0,15,0L0,0Z"></path>
  </svg>

  <!-- 最新资讯 -->
  <div class="NewsList">
    <div class="container">
      <NewsList />
    </div>
  </div>
</template>

<style scoped>
/* 新闻列表 */
.NewsList {
  margin-top: -2px;
  padding-top: 2px;
  background-color: #686de0;
}
/* 波浪 */
.wave {
  background-color: #686de0;
}
</style>
