import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path:'/',
    name:'home',
    component: () => import('@/views/homeView.vue')
  },
  {
    path: '/login',
    name: 'LoginView',
    component: () => import('@/views/Authpage/Authpage.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('@/views/Authpage/Login.vue')
      },
      {
        path: '/signup',
        name: 'Signup',
        component: () => import('@/views/Authpage/signup.vue')
      },
      {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: () => import('@/views/Authpage/ResetPassword.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


export default router
