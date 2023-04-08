<script setup>
import { ref } from 'vue';
import { Setting, User, House, Files } from '@element-plus/icons-vue';
import { useMenuStore } from '../stores/menu';
import { storeToRefs } from 'pinia';

const menuStore = useMenuStore();
const { isCollapse } = storeToRefs(menuStore);
</script>

<template>
  <div class="aside">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :router="true">
      <el-menu-item index="/Admin/">
        <el-icon><House /></el-icon>
        <template #title>首页</template>
      </el-menu-item>
      <el-menu-item index="/Admin/ArticleManage">
        <el-icon><Files /></el-icon>
        <template #title>文章管理</template>
      </el-menu-item>
      <el-menu-item index="/Admin/UserManage">
        <!-- <el-icon><setting /></el-icon> -->
        <el-icon><User /></el-icon>
        <template #title>用户管理</template>
      </el-menu-item>
      <el-menu-item index="/Admin/Authority">
        <el-icon><setting /></el-icon>
        <template #title>权限管理</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.aside {
  overflow-y: hidden;
}
</style>
