import { createRouter, createWebHistory } from 'vue-router'
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
        component: () => import('@/views/Homepage/organisationView.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/activity',
        name: 'Activity',
        component: () => import('@/views/Homepage/Activity.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/projects',
        name: 'Projects',
        component: () => import('@/views/Homepage/Projects.vue'),
        meta: { 
          requiresAuth: true
        }
      },
      {
        path: '/tasks',
        name: 'Tasks',
        component: () => import('@/views/Homepage/Tasks.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/report',
        name: 'Report',
        component: () => import('@/views/Homepage/Report.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/teams',
        name: 'Teams',
        component: () => import('@/views/Homepage/Teams.vue'),
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
        component: () => import('@/views/Homepage/Members.vue'),
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
        component: () => import('@/views/Homepage/InviteMembers.vue'),
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
        component:()=> import("@/views/Homepage/Profile.vue"),
        children:[
          {
            path:'projects',
            name:'userProjects',
            component: () => import('@/views/Homepage/UserProjects.vue')
          }
        ]
      },
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
