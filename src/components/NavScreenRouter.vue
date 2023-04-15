<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { open } = storeToRefs(userStore);

const Module1 = ref(false);
const Module2 = ref(false);
const Module3 = ref(false);
const Module4 = ref(false);
</script>

<template>
  <!-- Module1 -->
  <div class="module" @click="Module1 = !Module1">
    <div class="main">
      法律法规
      <div class="flex-grow" />
      <p
        :class="
          Module1 == false ? 'iconfont icon-plus' : 'iconfont icon-sub'
        "></p>
    </div>
    <div class="items" v-show="Module1">
      <router-link to="/ArticleList/law/10/1" @click="open = false">
        <div class="item">GDPR-通用数据保护条例</div>
      </router-link>
      <router-link to="/ArticleList/law/10/2" @click="open = false"
        ><div class="item">网络安全与数据安全</div></router-link
      >
      <router-link to="/ArticleList/law/10/3" @click="open = false"
        ><div class="item">信息安全管理</div></router-link
      >
      <router-link to="/ArticleList/law/10/4" @click="open = false">
        <div class="item">行业标准</div>
      </router-link>
    </div>
  </div>

  <!-- Module2 -->
  <div class="module" @click="Module2 = !Module2">
    <div class="main">
      <router-link to="/ArticleList/software/10/0" @click="open = false"
        >软件相关</router-link
      >
      <div class="flex-grow" />
    </div>
  </div>

  <!-- Module3 -->
  <div class="module" @click="Module3 = !Module3">
    <div class="main">
      <router-link to="/ArticleList/hardware/10/0" @click="open = false"
        >硬件相关</router-link
      >
      <div class="flex-grow" />
    </div>
  </div>

  <!-- Module4 -->
  <div class="module" @click="Module4 = !Module4">
    <div class="main">
      新手指南
      <div class="flex-grow" />
      <p
        :class="
          Module4 == false ? 'iconfont icon-plus' : 'iconfont icon-sub'
        "></p>
    </div>
    <div class="items" v-show="Module4">
      <router-link to="/ArticleList/Article/58" @click="open = false"
        ><div class="item">新手入门篇1</div></router-link
      >

      <router-link to="/ArticleList/Article/59" @click="open = false"
        ><div class="item">新手入门篇2_软件</div></router-link
      >

      <router-link to="/ArticleList/Article/60" @click="open = false"
        ><div class="item">新手入门篇3_硬件</div></router-link
      >
    </div>
  </div>
</template>

<style scoped>
.module {
  padding: 12px 0;
  border-bottom: 1px solid #686de0;
  color: #686de0;
  text-align: start;
  font-size: 18px;
  cursor: pointer;
}
.module .items {
  font-size: 16px;
}
.module:hover .main {
  color: #4834d4;
}
.main {
  display: flex;
}
.flex-grow {
  flex-grow: 1;
}
.items {
  display: flex;
  flex-direction: column;
}
.item:hover {
  color: #4834d4;
}

.item {
  flex: 1;
  padding-left: 8px;
  padding-top: 10px;
}
</style>
