import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import SupportView from '@/views/SupportView.vue';
import ProcessesView from '@/views/ProcessesView.vue'
import TrialView from '../views/TrialView.vue'

import { authGuard } from '@/guards/authGuard';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/client/trial',
      name: 'client-trial',
      component: TrialView,
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: authGuard,
    },
    {
      path: '/support',
      name: 'support',
      component: SupportView,
      beforeEnter: authGuard,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: ProcessesView,
      beforeEnter: authGuard,
    },
  ]
})

export default router
