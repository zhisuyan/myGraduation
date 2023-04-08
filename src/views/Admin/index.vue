<script setup>
import VerticalMenu from '../../components/VerticalMenu.vue';
import HorizonMenu from '../../components/HorizonMenu.vue';
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="auto">
        <VerticalMenu />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <HorizonMenu />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
.el-main {
  background-color: #686de0;
  min-width: 1720px;
}
</style>
