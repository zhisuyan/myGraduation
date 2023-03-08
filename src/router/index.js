import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import ArticleList from '../views/ArticleList.vue';
import Article from '../views/Article.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home,
      meta: { title: '软硬件信息安全资讯综合平台' },
    },
    {
      path: '/ArticleList',
      component: ArticleList,
      meta: { title: '文章列表', showIndex: true },
      children: [
        {
          path: 'Article',
          component: Article,
          meta: { title: '文章', showIndex: false },
        },
      ],
    },
  ],
});

export default router;
