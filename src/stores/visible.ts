import { defineStore } from 'pinia';

interface VisibleState {
  isVisible: boolean;
  switchView: boolean;
}

export const useVisibleStore = defineStore('visible', {
  state: (): VisibleState => ({
    isVisible: false,
    switchView: localStorage.getItem('switchView') === 'true' || false,
    // Set the initial value of `switchView` to the value in `localStorage`, or `true` if it is not set yet
  }),
  getters: {
    getSwitch(state) {
      return state.switchView;
    }
  },
  actions: {
    toggleVisibilityOn() {
      this.isVisible = true;
    },

    toggleVisibilityOff() {
      this.isVisible = false;
    },

    toggle() {
      this.switchView = !this.switchView;
      localStorage.setItem('switchView', String(this.switchView));
      // Update the value of `switchView` in `localStorage`
    }
  },
});