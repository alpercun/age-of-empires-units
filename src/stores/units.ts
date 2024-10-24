import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import unitsData from '@/assets/data/age-of-empires-units.json';
import { Age, ResourceType } from '@/types/enums';
import type { ResourceFilter } from '@/types/interfaces';

export const useUnitsStore = defineStore('units', () => {
  const selectedAges = ref<string[]>([Age.All]);
  const ages = ref<string[]>([
    Age.All,
    Age.Dark,
    Age.Feudal,
    Age.Castle,
    Age.Imperial,
  ]);

  const costWood = ref<ResourceFilter>({
    selected: false,
    type: ResourceType.Wood,
    range: {
      min: 0,
      max: 200,
    },
  });

  const costFood = ref<ResourceFilter>({
    selected: false,
    type: ResourceType.Food,
    range: {
      min: 0,
      max: 200,
    },
  });

  const costGold = ref<ResourceFilter>({
    selected: false,
    type: ResourceType.Gold,
    range: {
      min: 0,
      max: 200,
    },
  });

  const setCostWood = (data: ResourceFilter) => {
    costWood.value = data;
  };

  const setCostFood = (data: ResourceFilter) => {
    costFood.value = data;
  };

  const setCostGold = (data: ResourceFilter) => {
    costGold.value = data;
  };

  const matchCost = (
    unitCost: number | undefined,
    costFilter: ResourceFilter,
  ) => {
    if (!costFilter.selected) return true;
    const cost = unitCost ?? 0;
    return cost >= costFilter.range.min && cost <= costFilter.range.max;
  };

  const matchAge = (unitAge: string, selectedAges: string[]) => {
    return selectedAges.includes(Age.All) || selectedAges.includes(unitAge);
  };

  const filteredUnits = computed(() => {
    return unitsData.units.filter(unit => {
      const ageMatch = matchAge(unit.age, selectedAges.value);
      const costWoodMatch = matchCost(unit.cost?.Wood, costWood.value);
      const costFoodMatch = matchCost(unit.cost?.Food, costFood.value);
      const costGoldMatch = matchCost(unit.cost?.Gold, costGold.value);

      return ageMatch && costWoodMatch && costFoodMatch && costGoldMatch;
    });
  });

  const getSelectedUnit = (id: number) => {
    return unitsData.units.find(unit => unit.id === id);
  };

  return {
    units: filteredUnits,
    selectedAges,
    ages,
    costWood,
    costFood,
    costGold,
    setCostWood,
    setCostFood,
    setCostGold,
    getSelectedUnit,
  };
});
