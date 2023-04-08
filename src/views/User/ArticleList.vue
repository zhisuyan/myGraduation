<script setup>
import Lists from '../../components/Lists.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<template>
  <div class="bg-color-shallow">
    <Lists
      v-show="$route.meta.showIndex"
      :route="route"
      :key="new Date().getTime()" />
    <router-view></router-view>
  </div>
</template>

<style scoped>
/* 全局 */
.bg-color-shallow {
  background-color: #686de0;
  /* 数据填充后,删除此高度!!! */
  min-height: 800px;
  padding-top: 40px;
  padding-bottom: 80px;
}
</style>
