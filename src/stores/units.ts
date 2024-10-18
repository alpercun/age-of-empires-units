import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUnitsStore = defineStore('units', () => {
  const title = ref('Welcome to the Age of Empires Units');

  return { title };
});
