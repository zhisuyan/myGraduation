<script setup>
import { ref, watch, onMounted } from 'vue';
import 'animate.css';
import NavScreenRouter from './NavScreenRouter.vue';
import UserLoginCard from './UserLoginCard.vue';
import { useUserStore } from '../stores/user';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
const { id, username, email, points, open } = storeToRefs(userStore);
const activeIndex = ref('1');
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath);
};
// 遮罩层是否出现
// const open = ref(false);

// 退出登录
function logOut() {
  sessionStorage.removeItem('userToken');
  (id.value = ''),
    (username.value = ''),
    (email.value = ''),
    (points.value = 0);
  open.value = false;
  router.replace({ path: '/' });
}

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
    default-active="1"
    class="el-menu-demo"
    mode="horizontal"
    text-color="#686de0"
    active-text-color="#4834d4"
    :ellipsis="false"
    :router="true"
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
        index=""
        class="iconfont icon-menu hidden-sm-and-up el-menu-item"></button>
      <button
        v-else-if="open"
        index=""
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
    <el-menu-item index="/" style="font-size: 16.6px" @click="open = false"
      >首页</el-menu-item
    >
    <div class="flex-grow" />

    <!-- module2 -->
    <el-sub-menu index="" class="hidden-xs-only">
      <template #title>法律法规</template>
      <el-menu-item index="/ArticleList/law/10/1">
        GDPR-通用数据保护条例
      </el-menu-item>
      <el-menu-item index="/ArticleList/law/10/2"
        >网络安全与数据安全</el-menu-item
      >
      <el-menu-item index="/ArticleList/law/10/3"> 信息安全管理 </el-menu-item>
    </el-sub-menu>

    <!-- module3 -->

    <el-menu-item index="/ArticleList/software/10/0" class="hidden-xs-only">
      软件相关
    </el-menu-item>

    <!-- module4 -->
    <el-menu-item index="/ArticleList/hardware/10/0" class="hidden-xs-only">
      硬件相关
    </el-menu-item>

    <!-- module5 -->
    <el-menu-item index="/ArticleList/guidance/10/0" class="hidden-xs-only">
      <a href="#">新手指南</a>
    </el-menu-item>

    <el-sub-menu index="6" v-if="username">
      <template #title>{{ username }}</template>
      <el-menu-item index="/center" @click="open = false"
        >个人空间</el-menu-item
      >
      <el-menu-item index="" class="logout" @click="logOut"
        >退出登录</el-menu-item
      >
    </el-sub-menu>
    <UserLoginCard v-else-if="!username" />
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
.logout {
  color: #f56c6c !important;
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
