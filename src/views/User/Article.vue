<script setup>
import Text from '../../components/Text.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const articleId = route.params.Id;
</script>

<template>
  <div class="container-article">
    <Text :Id="articleId" />
  </div>
</template>

<style scoped>
.container-article {
  max-width: 940px;
  min-width: 350px;
  margin: 0 auto;
  box-shadow: 0 0 10px #aaa;
  background-color: #fff;
}
</style>
