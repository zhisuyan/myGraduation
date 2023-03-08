<script setup>
import 'element-plus/theme-chalk/display.css';
import NavBar from './components/NavBar.vue';
import FooterNav from './components/FooterNav.vue';
import Breadcrumb from './components/Breadcrumb.vue';
</script>

<template>
  <!-- 导航栏 -->
  <nav>
    <div class="container">
      <NavBar />
    </div>
  </nav>

  <!-- 面包屑 -->
  <div class="breadcrumb">
    <div class="container">
      <Breadcrumb />
    </div>
  </div>

  <!-- 路由 -->
  <router-view> </router-view>

  <!-- footer -->
  <footer>
    <div class="container">
      <FooterNav />
    </div>
  </footer>
</template>

<style>
/*
* #686de0 浅主题色
* #4834d4 深主题色
* #e4e4e4 分割线
*/

@font-face {
  font-family: 'Alimama_ShuHeiTi_Bold';
  src: url('./assets/font/Alimama_ShuHeiTi_Bold/Alimama_ShuHeiTi_Bold.woff2')
      format('woff2'),
    /* Super Modern Browsers */
      url('./assets/font/Alimama_ShuHeiTi_Bold/Alimama_ShuHeiTi_Bold.woff')
      format('woff'),
    /* Pretty Modern Browsers */
      url('./assets/font/Alimama_ShuHeiTi_Bold/Alimama_ShuHeiTi_Bold.ttf')
      format('truetype'); /* Safari, Android, iOS */
}

.container {
  margin: 0 auto;
  max-width: 1440px;
}

/* 导航栏 */
nav {
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
}

/* 面包屑 */
.breadcrumb {
  background-color: #f9f9f9;
  border-bottom: 1px solid #e4e4e4;
}

/* footer */
@media screen and (max-width: 1440px) {
  footer {
    display: none;
  }
}

footer {
  background-color: #f9f9f9;
  padding-left: 150px;
}
</style>
