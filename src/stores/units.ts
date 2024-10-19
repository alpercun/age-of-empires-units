import { ref } from 'vue';
import { defineStore } from 'pinia';
import unitsData from '@/assets/data/age-of-empires-units.json';

export const useUnitsStore = defineStore('units', () => {
  const title = ref('Welcome to the Age of Empires Units');

  return {
    title,
    units: unitsData.units,
  };
});
