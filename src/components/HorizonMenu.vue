<script setup>
import 'animate.css';
import { storeToRefs } from 'pinia';
import { Fold, Expand } from '@element-plus/icons-vue';
import { useMenuStore } from '../stores/menu';
import { useAdminStore } from '../stores/admin';
import { useRouter } from 'vue-router';

const menuStore = useMenuStore();
const adminStore = useAdminStore();
const { isCollapse } = storeToRefs(menuStore);
const { id, username, email, isActive, power } = storeToRefs(adminStore);
const router = useRouter();

// 切换折叠
function changeCollapse() {
  menuStore.changeCollapse();
}

function logOut() {
  sessionStorage.removeItem('adminToken');
  router.push({ path: '/login' });
}
</script>

<template>
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    default-active="1"
    :router="true">
    <!-- 折叠切换 -->
    <el-menu-item index="" @click="changeCollapse">
      <transition
        name="animate__animated animate__bounce"
        mode="out-in"
        class="animate__faster"
        enter-active-class="animate__fadeIn"
        leave-active-class="animate__fadeOut">
        <el-icon v-if="!isCollapse"><Fold /></el-icon>
        <el-icon v-else-if="isCollapse"><Expand /></el-icon>
      </transition>
    </el-menu-item>

    <div class="flex-grow" />
    <el-menu-item index="/">官网首页</el-menu-item>
    <el-sub-menu index="">
      <template #title>{{ username }}</template>
      <!-- <el-card :body-style="{ padding: '0px' }">
        <img
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          class="image" />
        <div style="padding: 14px">
          <span>管理员名称</span>
        </div>
      </el-card> -->
      <el-menu-item index="/Admin/">首页</el-menu-item>
      <el-menu-item index="/Admin/ArticleManage">文章管理</el-menu-item>
      <el-menu-item index="/Admin/UserManage">用户管理</el-menu-item>
      <el-menu-item index="/Admin/Authority">权限管理</el-menu-item>
      <el-menu-item index="" @click="logOut">退出登录</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style>
.flex-grow {
  flex-grow: 1;
}
/* card */
.image {
  width: 100%;
  display: block;
}
</style>
