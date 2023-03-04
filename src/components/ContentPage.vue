<script setup></script>

<template>
  <section class="hero">
    <h1 class="tagline">
      <span class="accent"> 欢迎使用 </span>
      <br />
      <p class="title">软硬件信息安全资讯综合平台</p>
    </h1>
  </section>
</template>

<style scoped>
.hero {
  width: 1440px;
  height: 700px;
  /* background-color: skyblue; */
  padding: 96px 32px;
  box-sizing: border-box;
}
.tagline {
  font-size: 76px;
  text-align: center;
}
.accent {
  background-image: linear-gradient(to right bottom, #ff2b7d, #ffbe49);
  -webkit-background-clip: text;
  color: transparent;
}

.title {
  padding-top: 30px;
  color: #fff;
}
</style>
