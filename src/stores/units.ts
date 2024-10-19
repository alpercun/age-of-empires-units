import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import unitsData from '@/assets/data/age-of-empires-units.json';

export const useUnitsStore = defineStore('units', () => {
  const title = ref('Welcome to the Age of Empires Units');
  const selectedAges = ref<string[]>(['All']);
  const ages = ref<string[]>(['All', 'Dark', 'Feudal', 'Castle', 'Imperial']);

  const filteredUnits = computed(() => {
    const data = unitsData.units;
    if (selectedAges.value.includes('All')) return data;

    return data.filter(unit => selectedAges.value.includes(unit.age));
  });

  return {
    title,
    units: filteredUnits,
    selectedAges,
    ages,
  };
});
