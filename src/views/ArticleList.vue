<script setup>
import Lists from '../components/Lists.vue';
</script>

<template>
  <div class="bg-color-shallow" v-show="$route.meta.showIndex">
    <Lists />
  </div>
  <router-view></router-view>
</template>

<style scoped>
/* 全局 */
.bg-color-shallow {
  background-color: #686de0;
  height: 900px;
  padding-top: 40px;
  padding-bottom: 80px;
}
</style>
