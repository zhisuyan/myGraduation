import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    username: '',
    email: '',
    points: 0,
  }),
  persist: true,
});
