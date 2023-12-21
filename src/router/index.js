import { createRouter, createWebHistory } from 'vue-router';
import organisation from '@/views/Homepage/organisation.vue';
import Activity from '@/views/Homepage/Activity.vue';
import Projects from '@/views/Homepage/Projects.vue';
import Tasks from '@/views/Homepage/Tasks.vue';
import Report from '@/views/Homepage/Report.vue';
import homeView from '@/views/homeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    redirect:'/organisation',
    component: homeView,
    meta: {
      requiresAuth: true
    },

    children: [
      {
        path: '/organisation',
        name: 'organisation',
        component: organisation,
      },
      {
        path: '/activity',
        name: 'Activity',
        component: Activity,
      },
      {
        path: '/projects',
        name: 'Projects',
        component:  Projects,
      },
      {
        path: '/tasks',
        name: 'Tasks',
        component:  Tasks,
      },
      {
        path: '/report',
        name: 'Report',
        component: Report,
      }
    ]
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

const isLoggedIn = () => {
  const authToken = localStorage.getItem('jwtToken')
  return authToken !== null && authToken !== undefined
}

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isLoggedIn()) {
    // Redirect to login page if authentication is required but user is not logged in
    next({ name: 'Login' });
  } else if (to.name === 'Login' && isLoggedIn()) {
    // Redirect to home page if already authenticated and trying to access login page
    next({ name: 'home' });
  } else {
    // Continue with navigation
    next();
  }
})
export default router
