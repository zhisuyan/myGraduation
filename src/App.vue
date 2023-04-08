<script setup>
import 'element-plus/theme-chalk/display.css';
</script>

<template>
  <router-view></router-view>
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
</style>
