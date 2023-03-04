<script setup>
import 'element-plus/theme-chalk/display.css';
import ContentPage from './components/ContentPage.vue';

import NavBar from './components/NavBar.vue';
</script>

<template>
  <nav>
    <div class="container">
      <NavBar />
    </div>
  </nav>
  <div class="container">
    <ContentPage />
  </div>
</template>

<style>
/*
* #686de0 浅主题色
* #4834d4 深主题色
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

* {
  margin: 0;
  padding: 0;
  border: 0;
}

body {
  background-color: #686de0;
  font-family: 'Alimama_ShuHeiTi_Bold', 'Microsoft Yahei';
}
a {
  text-decoration: none;
  outline: none;
  color: inherit;
}

a:s :root {
  --animate-delay: 0s;
  --animate-duration: 0.4s;
}
nav {
  background-color: #fff;
  border-bottom: 2px solid #686de0;
}

.container {
  margin: 0 auto;
  max-width: 1440px;
}
</style>
