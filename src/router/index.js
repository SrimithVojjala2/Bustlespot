import { createRouter, createWebHistory } from 'vue-router'
import organisation from '@/views/Homepage/organisationView.vue'
import Activity from '@/views/Homepage/Activity.vue'
import Projects from '@/views/Homepage/Projects.vue'
import Tasks from '@/views/Homepage/Tasks.vue'
import Report from '@/views/Homepage/Report.vue'
import isLoggedIn from './auth';
import Teams from '@/views/Homepage/Teams.vue';
import Members from '@/views/Homepage/Members.vue';
import InviteMembers from '@/views/Homepage/InviteMembers.vue';
import store from '@/store/store'

const routes = [
  {
    path:'/',
    component: ()=>import('@/views/homeView.vue'),
    redirect:'/organisation',
  },
  {
    path: '/organisation',
    name: 'organisation',
    components:{default: organisation, SideBar: () => import('@/components/SidebarComp.vue')},
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/activity',
    name: 'Activity',
    components: {default:Activity,SideBar: () => import('@/components/SidebarComp.vue')},
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/projects',
    name: 'Projects',
    components: {default: Projects,SideBar: () => import('@/components/SidebarComp.vue')},
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/tasks',
    name: 'Tasks',
    components:{default:Tasks,SideBar: () => import('@/components/SidebarComp.vue')},
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/report',
    name: 'Report',
    components: {default:Report,SideBar: () => import('@/components/SidebarComp.vue')},
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/teams',
    name: 'Teams',
    components: {default:Teams,SideBar: () => import('@/components/SidebarComp.vue')},
    meta: {
      requiresAuth: true
    },
    beforeEnter: (to, from, next) => {
      // Your custom logic here
      if (store.state.roleId === 1 || store.state.roleId===2) {
        next(); // Proceed to the route
      } else {
        next('/organisation'); // Redirect to another route
      }
    }
  },
  {
    path: '/members',
    name: 'Members',
    components: {default:Members,SideBar: () => import('@/components/SidebarComp.vue')},
    meta: {
      requiresAuth: true
    },
    beforeEnter: (to, from, next) => {
      // Your custom logic here
      if (store.state.roleId === 1 || store.state.roleId===2) {
        next(); // Proceed to the route
      } else {
        router.push('/organisation'); // Redirect to another route
      }
    }
  },
  {
    path: '/invite-members',
    name: 'InviteMembers',
    components: {default:InviteMembers,SideBar: () => import('@/components/SidebarComp.vue')},
    meta: {
      requiresAuth: true
    },
    beforeEnter: (to, from, next) => {
      // Your custom logic here
      if (store.state.roleId === 1 || store.state.roleId===2) {
        next(); // Proceed to the route
      } else {
        next('/organisation'); // Redirect to another route
      }
    }
  },
  {
    path: '/login',
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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

let isAuth = isLoggedIn();

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuth) {
    // Redirect to login page if authentication is required but user is not logged in
    next({ name: 'Login' })
  } else if (to.name === 'Login' && isAuth) {
    // Redirect to home page if already authenticated and trying to access login page
    next({ name: 'organisation' })
  } else {
    // Continue with navigation
    next()
  }
})
export default router
