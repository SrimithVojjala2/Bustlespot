
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path:'/',
    name:'home',
    redirect:'/organisation',
    component: () => import('@/views/homeView.vue'),
    props:true,
    meta:{
      requiresAuth:true
    },
    children:[
      {
        path:'organisation',
        name:'organisation',
        component: () => import('@/views/Homepage/organisation.vue')
      },
      {
        path:'activity',
        name:'Activity',
        component: () => import('@/views/Homepage/Activity.vue')
      },{
        path:'projects',
        name:'Projects',
        component: () => import('@/views/Homepage/Projects.vue')
      },{
        path:'tasks',
        name:'Tasks',
        component: () => import('@/views/Homepage/Tasks.vue')
      },{
        path:'report',
        name:'Report',
        component: () => import('@/views/Homepage/Report.vue')
      },
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
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

const isLoggedIn = () => {
    const authToken = localStorage.getItem('jwtToken');
    return authToken !== null && authToken !== undefined;
}

router.beforeEach((to, from,next) => {
  if (to.name === 'Login' && isLoggedIn()) {
    // Redirect to home page if already authenticated
    next({ name: 'home' });
  }else if (to.meta.requiresAuth && !isLoggedIn()) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    next({
      name: 'Login',
    });
  }
  else{
    next();
  }
})
export default router
