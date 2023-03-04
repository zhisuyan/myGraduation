<script setup>
import { ref } from 'vue';
const Module1 = ref(false);
const Module2 = ref(false);
const Module3 = ref(false);
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
      <div class="item">网络管理1</div>
      <div class="item">网络管理2</div>
      <div class="item">网络管理3</div>
    </div>
  </div>

  <!-- Module2 -->
  <div class="module" @click="Module2 = !Module2">
    <div class="main">
      软件相关
      <div class="flex-grow" />
      <p
        :class="
          Module2 == false ? 'iconfont icon-plus' : 'iconfont icon-sub'
        "></p>
    </div>
    <div class="items" v-show="Module2">
      <div class="item">网络管理1</div>
      <div class="item">网络管理2</div>
      <div class="item">网络管理3</div>
    </div>
  </div>

  <!-- Module3 -->
  <div class="module" @click="Module3 = !Module3">
    <div class="main">
      硬件相关
      <div class="flex-grow" />
      <p
        :class="
          Module3 == false ? 'iconfont icon-plus' : 'iconfont icon-sub'
        "></p>
    </div>
    <div class="items" v-show="Module3">
      <div class="item">网络管理1</div>
      <div class="item">网络管理2</div>
      <div class="item">网络管理3</div>
    </div>
  </div>

  <!-- Module4 -->
  <div class="module">
    <div class="main">
      <a href="#">
        新手入门
        <div class="flex-grow" />
      </a>
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
