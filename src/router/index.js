import { createRouter, createWebHistory } from 'vue-router'
import organisation from '@/views/Homepage/organisationView.vue'
import Activity from '@/views/Homepage/Activity.vue'
import Projects from '@/views/Homepage/Projects.vue'
import Tasks from '@/views/Homepage/Tasks.vue'
import Report from '@/views/Homepage/Report.vue'
// import isLoggedIn from './auth'
import Teams from '@/views/Homepage/Teams.vue'
import Members from '@/views/Homepage/Members.vue'
import InviteMembers from '@/views/Homepage/InviteMembers.vue'
import store from '@/store/store'
import isLoggedIn from './auth'

const routes = [
  {
    path: '/',
    component: () => import('@/views/homeView.vue'),
    redirect: '/organisation',
    children: [
      {
        path: '/organisation',
        name: 'organisation',
        component: organisation,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/activity',
        name: 'Activity',
        component: Activity,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/projects',
        name: 'Projects',
        component: Projects,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/tasks',
        name: 'Tasks',
        component: Tasks,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/report',
        name: 'Report',
        component: Report,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/teams',
        name: 'Teams',
        component: Teams,
        meta: {
          requiresAuth: true
        },
        beforeEnter: (to, from, next) => {
          // Your custom logic here
          if (store.state.roleId === 1 || store.state.roleId === 2) {
            next() // Proceed to the route
          } else {
            next('/organisation') // Redirect to another route
          }
        }
      },
      {
        path: '/members',
        name: 'Members',
        component: Members,
        meta: {
          requiresAuth: true
        },
        beforeEnter: (to, from, next) => {
          // Your custom logic here
          if (store.state.roleId == 1 || store.state.roleId == 2) {
            next()
          } else {
            next('/organisation') 
          }
        }
      },
      {
        path: '/invite-members',
        name: 'InviteMembers',
        component: InviteMembers,
        meta: {
          requiresAuth: true
        },
        beforeEnter: (to, from, next) => {
          // Your custom logic here
          if (store.state.roleId === 1 || store.state.roleId === 2) {
            next() // Proceed to the route
          } else {
            next('/organisation') // Redirect to another route
          }
        }
      },
      {
        path:'/profile',
        name:'Profile',
        component: () => import('@/views/Homepage/Profile.vue'),
        meta:{
          requiresAuth: true
        },
      }
    ],
    beforeEnter: (to,from,next) => {
      if(to.meta.requiresAuth && !isLoggedIn()){
        next('/login')
      }else{
        next()
      }
    }
  },
  
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Authpage/Login.vue'),
    beforeEnter:(to,from,next) => {
      if(to.name === 'Login' && isLoggedIn()){
        next('/organisation')
      }else{
        next()
      }
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/views/Authpage/signup.vue'),
    beforeEnter:(to,from,next) => {
      if(to.name === 'Signup' && isLoggedIn()){
        next('/organisation')
      }else{
        next()
      }
    }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('@/views/Authpage/ResetPassword.vue'),
    beforeEnter:(to,from,next) => {
      if(to.name === 'ForgotPassword' && isLoggedIn()){
        next('/organisation')
      }else{
        next()
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
