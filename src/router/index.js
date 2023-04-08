import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/User/Home.vue';
import ArticleList from '../views/User/ArticleList.vue';
import Article from '../views/User/Article.vue';
import User from '../views/User/index.vue';
import Admin from '../views/Admin/index.vue';
import AdminHome from '../views/Admin/Home.vue';
import Authority from '../views/Admin/Authority.vue';
import UserManage from '../views/Admin/UserManage.vue';
import ArticleManage from '../views/Admin/ArticleManage.vue';
import Login from '../views/Login.vue';
import Center from '../views/User/Center.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 前台部分
    {
      path: '/',
      component: User,
      meta: { title: '软硬件信息安全资讯综合平台' },
      children: [
        {
          path: '',
          component: Home,
        },
        {
          path: '/center',
          component: Center,
          meta: { title: '个人中心' },
          beforeEnter: (to, from, next) => {
            if (!sessionStorage.getItem('userToken')) {
              router.replace('/');
            } else {
              next();
            }
          },
        },
        {
          // /:Class?/:start?/:count?/subclass?
          path: '/ArticleList/:Class?/:count?/:subclass?',
          component: ArticleList,
          name: 'ArticleList',
          meta: { title: '文章列表', showIndex: true },
          children: [
            {
              path: 'Article/:Id?',
              component: Article,
              meta: { title: '文章', showIndex: false },
            },
          ],
        },
      ],
    },

    // 后台部分
    {
      path: '/Admin',
      component: Admin,
      meta: { title: '后台' },
      beforeEnter: (to, from, next) => {
        if (!sessionStorage.getItem('adminToken')) {
          router.replace('/Login');
        } else {
          next();
        }
      },
      children: [
        {
          path: '',
          component: AdminHome,
          meta: { title: '首页' },
          beforeEnter: (to, from, next) => {
            if (!sessionStorage.getItem('adminToken')) {
              router.replace('/Login');
            } else {
              next();
            }
          },
        },
        {
          path: 'Authority',
          component: Authority,
          meta: { title: '权限管理' },
          beforeEnter: (to, from, next) => {
            if (!sessionStorage.getItem('adminToken')) {
              router.replace('/Login');
            } else {
              next();
            }
          },
        },
        {
          path: 'UserManage',
          component: UserManage,
          meta: { title: '用户管理' },
          beforeEnter: (to, from, next) => {
            if (!sessionStorage.getItem('adminToken')) {
              router.replace('/Login');
            } else {
              next();
            }
          },
        },
        {
          path: 'ArticleManage',
          component: ArticleManage,
          meta: { title: '文章管理' },
          beforeEnter: (to, from, next) => {
            if (!sessionStorage.getItem('adminToken')) {
              router.replace('/Login');
            } else {
              next();
            }
          },
        },
      ],
    },

    {
      path: '/Login',
      component: Login,
      meta: { title: '管理员登陆' },
    },
  ],
});

export default router;
