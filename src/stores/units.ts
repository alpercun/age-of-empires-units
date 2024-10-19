import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import unitsData from '@/assets/data/age-of-empires-units.json';

enum Age {
  All = 'All',
  Dark = 'Dark',
  Feudal = 'Feudal',
  Castle = 'Castle',
  Imperial = 'Imperial',
}

enum ResourceType {
  Wood = 'Wood',
  Food = 'Food',
  Gold = 'Gold',
}

type ResourceFilter = {
  selected: boolean;
  type: ResourceType;
  range: {
    min: number;
    max: number;
  };
};

interface Unit {
  id: number;
  name: string;
  description: string;
  expansion: string;
  age: string;
  cost: {
    Wood?: number;
    Food?: number;
    Gold?: number;
  };
  build_time: number;
  reload_time: number;
  attack_delay: number;
  movement_rate: number;
  line_of_sight: number;
  hit_points: number;
  range: number;
  attack: number;
  armor: string;
  accuracy: string;
}

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

  const selectedUnit = ref<Unit | null>(null);

  const setSelectedUnit = (unit: Unit) => {
    selectedUnit.value = unit;
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
    selectedUnit,
    setSelectedUnit,
  };
});
