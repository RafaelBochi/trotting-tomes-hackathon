import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'início' },
      component: () => import('@/layouts/FullLayout.vue'),
      children: [
        {
          path: 'inicio',
          name: 'início',
          component: () => import('../views/Full/HomeView.vue'),
          exact: true
        },
        {
          path: 'catalogo',
          name: 'catálogo',
          component: () => import('../views/Full/ProductsView.vue'),
          exact: true
        },
        {
          path: 'busca/:search',
          name: 'busca',
          component: () => import('../views/Full/SearchView.vue'),
          exact: true,
          props: true
        },
        {
          path: 'book/:id',
          name: 'bookPage',
          component: () => import('../views/Full/BookPageView.vue'),
          props: true,
        },
        {
          path: 'carrinho',
          name: 'carrinho',
          component: () => import('../views/Full/CartView.vue'),
          exact: true
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
