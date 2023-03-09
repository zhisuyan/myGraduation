<script setup>
import Lists from '../components/Lists.vue';
</script>

<template>
  <div class="bg-color-shallow">
    <Lists v-show="$route.meta.showIndex" />
    <router-view></router-view>
  </div>
</template>

<style scoped>
/* 全局 */
.bg-color-shallow {
  background-color: #686de0;
  /* 数据填充后,删除此高度!!! */
  height: 900px;
  padding-top: 40px;
  padding-bottom: 80px;
}
</style>
