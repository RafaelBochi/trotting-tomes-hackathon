import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'home' },
      component: () => import('@/layouts/FullLayout.vue'),
      children: [
        {
          path: 'home',
          name: 'home',
          meta: {
            requiresAuth: true
          },
          component: () => import('../views/Full/HomeView.vue'),
          exact: true
        },
        {
          path: 'products',
          name: 'products',
          meta: {
            requiresAuth: true
          },
          component: () => import('../views/Full/ProductsView.vue'),
          exact: true
        },
        {
          path: 'about',
          name: 'about',
          meta: {
            requiresAuth: true
          },
          component: () => import('../views/Full/AboutView.vue'),
        },
        {
          path: 'book/:id',
          name: 'bookPage',
          component: () => import('../views/Full/BookPageView.vue'),
          props: true,
        }
      ]
    },
    {
      path: '/',
      component: () => import("@/layouts/LoginLayout.vue"),
      exact: true,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('../views/Login/LoginView.vue'),
          exact: true
        },
        {
          path: '/forget-password',
          name: 'forgetPassword',
          component: () => import('../views/Login/ForgetPasswordView.vue'),
        },
        {
          path: '/change-password',
          name: 'changePassword',
          component: () => import('../views/Login/ChangePasswordView.vue'),
        },
        {
          path: '/token-change-password',
          name: 'tokenChangePassword',
          component: () => import('../views/Login/TokenChangePassworView.vue'),
        },
      ]
    }
  ]
})



export default router
