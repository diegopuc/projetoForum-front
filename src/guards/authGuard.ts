import { useAuthStore } from '@/stores/auth'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export const authGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const isAuthenticated = useAuthStore().isAuthenticated
  if (!isAuthenticated) {
    next(  '/login' )
  } else {
    next()
  }
}