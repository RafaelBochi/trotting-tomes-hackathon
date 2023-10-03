import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'inicio' },
      component: () => import('@/layouts/FullLayout.vue'),
      children: [
        {
          path: 'inicio',
          name: 'inicio',
          component: () => import('../views/Full/HomeView.vue'),
          exact: true
        },
        {
          path: 'catalogo',
          name: 'catalogo',
          component: () => import('../views/Full/ProductsView.vue'),
          exact: true
        },
        {
          path: 'book/:id',
          name: 'bookPage',
          component: () => import('../views/Full/BookPageView.vue'),
          props: true,
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('../views/Full/SettingsView.vue')
        },
        {
          path: 'comprar',
          name: 'comprar',
          component: () => import('../views/Full/BuyView.vue')
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
