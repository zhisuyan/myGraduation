<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowRight } from '@element-plus/icons-vue';

const router = useRouter();
const routers = computed(() => {
  // 过滤掉没有meta的
  return router.currentRoute.value.matched.filter(item => item.meta.title);
});
</script>

<template>
  <!-- 面包屑 -->
  <div class="Breadcrumb">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item
        v-for="item in routers"
        :key="item.path"
        :to="{ path: item?.path }">
        {{ item?.meta?.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style>
/* 面包屑 */
.Breadcrumb {
  padding: 15px;
}
</style>
