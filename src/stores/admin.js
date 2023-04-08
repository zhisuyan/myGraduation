import { defineStore } from 'pinia';

export const useAdminStore = defineStore('admin', {
  state: () => ({
    id: '',
    username: '',
    email: '',
    isActive: 1,
    power: 0,
  }),
  persist: true,
});
