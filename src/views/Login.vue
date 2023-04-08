<script setup>
import LoginCard from '../components/LoginCard.vue';
</script>

<template>
  <div class="bg">
    <div class="container login-card">
      <LoginCard />
    </div>
  </div>
</template>

<style scoped>
.bg {
  height: 100%;
  background-image: linear-gradient(
    -225deg,
    #2cd8d5 0%,
    #c5c1ff 56%,
    #ffbac3 100%
  );
}
.login-card {
  position: fixed;
  background-color: #fff;
  height: 600px;
  width: 1100px;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  opacity: 0.9;
}
</style>
