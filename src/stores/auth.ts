import { defineStore } from 'pinia';
import http from '@/service/http.service';
import type { DIEmailStrategy } from '@/models/email.strategy.dto';
import router from '@/router';

interface AuthState {
    authenticated: boolean,
    lastActiveTime: number | null,
}

const AUTO_LOGOUT_TIME = 24 * 60 * 60 * 1000; 

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): AuthState => ({
    authenticated: !!localStorage.getItem('accessToken'),
    lastActiveTime: Date.now(),
  }),
  getters: {
    isAuthenticated(state): boolean {
      return state.authenticated
    },
  },
  actions: {
    async login(user: DIEmailStrategy) {
      try {
        const response = await http.post<{ token: string }>('/auth/login', user)
        const token = response.data.token
        localStorage.setItem('accessToken', token)
        this.authenticated = true
        this.lastActiveTime = Date.now();
      } catch (error) {
        console.error(error);
        // console.log("login failed");
      }
    },

      logout() {
      localStorage.removeItem('accessToken')
      this.authenticated = false;
      this.lastActiveTime = null; 
      router.push('/login')
    },

    checkAutoLogout() {
      if (this.authenticated && this.lastActiveTime) {
        const timeElapsed = Date.now() - this.lastActiveTime;
        if (timeElapsed >= AUTO_LOGOUT_TIME) {
          this.logout();
        }
      }
    },
  },
});