<script setup>
import { ref, watch, onMounted } from 'vue';
import 'animate.css';
import NavScreenRouter from './NavScreenRouter.vue';

const activeIndex = ref('1');
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath);
};
// 遮罩层是否出现
const open = ref(false);

// 窗口大小监听
const screenWidth = ref(
  window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth
);

onMounted(() => {
  window.onresize = () => {
    return (() => {
      screenWidth.value =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
    })();
  };
});

watch(screenWidth, val => {
  screenWidth.value = val;
  if (screenWidth.value >= 768) {
    open.value = false;
  }
});
</script>

<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    text-color="#686de0"
    active-text-color="#4834d4"
    :ellipsis="false"
    @select="handleSelect">
    <!-- Menu  -->
    <transition
      name="animate__animated animate__bounce"
      mode="out-in"
      enter-active-class="animate__fadeIn"
      leave-active-class="animate__fadeOut">
      <button
        v-if="!open"
        @click="open = true"
        index="3"
        class="iconfont icon-menu hidden-sm-and-up el-menu-item"></button>
      <button
        v-else-if="open"
        index="4"
        class="iconfont icon-guanbi el-menu-item hidden-sm-and-up"
        @click="open = false"></button>
    </transition>

    <!-- Modal -->
    <Teleport to="body">
      <transition
        name="animate__animated animate__bounce"
        enter-active-class="animate__fadeInDown"
        leave-active-class="animate__fadeOutUp">
        <div
          v-if="open"
          class="modal hidden-sm-and-up"
          v-on:resize="resizeEvent($event)">
          <div class="modal-container">
            <div class="modal-content">
              <NavScreenRouter />
            </div>
          </div>
        </div>
      </transition>
    </Teleport>

    <!-- module1 -->
    <el-menu-item index="1" style="font-size: 16.6px"
      ><router-link to="/">首页</router-link></el-menu-item
    >
    <div class="flex-grow" />

    <!-- module2 -->
    <el-sub-menu index="2" class="hidden-xs-only">
      <template #title>法律法规</template>
      <el-menu-item index="2-1"
        ><router-link to="/ArticleList">item one</router-link></el-menu-item
      >
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
    </el-sub-menu>

    <!-- module3 -->
    <el-sub-menu index="3" class="hidden-xs-only">
      <template #title>软件相关</template>
      <el-menu-item index="3-1">item one</el-menu-item>
      <el-menu-item index="3-2">item two</el-menu-item>
      <el-menu-item index="3-3">item three</el-menu-item>
    </el-sub-menu>

    <!-- module4 -->
    <el-sub-menu index="4" class="hidden-xs-only">
      <template #title>硬件相关</template>
      <el-menu-item index="4-1">item one</el-menu-item>
      <el-menu-item index="4-2">item two</el-menu-item>
      <el-menu-item index="4-3">item three</el-menu-item>
    </el-sub-menu>

    <!-- module5 -->
    <el-menu-item index="5" class="hidden-xs-only"
      ><a href="#">新手指南</a></el-menu-item
    >
  </el-menu>
</template>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
.el-menu {
  z-index: 1000;
}

.icon-menu {
  background-color: #fff;
}

/* 模态框 */
.modal {
  position: fixed;
  z-index: 999;
  top: 60px;
  left: 0x;
  width: 100%;
  height: 100%;
  /* margin-left: -150px; */
  background-color: #fff;
}

.modal-container {
  position: absolute;
  left: 50%;
  transform: translateX(-195px);
  width: 390px;
  height: 100%;
}
.modal-content {
  text-align: center;
  width: 288px;
  height: 631px;
  padding-top: 86px;
  padding-bottom: 96px;
  margin: 0 auto;
}
</style>
