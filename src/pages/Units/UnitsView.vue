<template>
  <v-container>
    <h1>Units</h1>
    <UnitAgeFilter
      v-model="unitsStore.selectedAges"
      :items="unitsStore.ages"
      @update:model-value="handleAgeSelection"
    />
    <ResourceCostFilter
      :type="unitsStore.costWood.type"
      :min="MIN_COST"
      :max="MAX_COST"
      @update="unitsStore.setCostWood"
    />
    <ResourceCostFilter
      :type="unitsStore.costFood.type"
      :min="MIN_COST"
      :max="MAX_COST"
      @update="unitsStore.setCostFood"
    />
    <ResourceCostFilter
      :type="unitsStore.costGold.type"
      :min="MIN_COST"
      :max="MAX_COST"
      @update="unitsStore.setCostGold"
    />
    <UnitList :units="unitsStore.units" :headers="headers" />
  </v-container>
</template>

<script setup lang="ts">
const MIN_COST = 0;
const MAX_COST = 200;

import { ref } from 'vue';
import UnitList from '@/components/UnitList/UnitList.vue';
import UnitAgeFilter from '@/components/UnitAgeFilter/UnitAgeFilter.vue';
import ResourceCostFilter from '@/components/ResourceCostFilter/ResourceCostFilter.vue';
import { useUnitsStore } from '@/stores/units';
import { Age } from '@/types/enums';

const unitsStore = useUnitsStore();

const headers = ref([
  { id: 'id', title: 'ID', key: 'id', width: '10%' },
  { id: 'name', title: 'Name', key: 'name', width: '20%' },
  { id: 'age', title: 'Age', key: 'age', width: '10%' },
  { id: 'cost', title: 'Cost', key: 'cost', width: '20%' },
]);

const handleAgeSelection = (selectedAges: string[]) => {
  const otherOptions = [Age.Dark, Age.Feudal, Age.Castle, Age.Imperial];

  if (
    selectedAges.includes(Age.All) &&
    otherOptions.every(age => selectedAges.includes(age))
  ) {
    unitsStore.selectedAges = [Age.All];
  } else if (
    !selectedAges.includes(Age.All) &&
    otherOptions.every(age => selectedAges.includes(age))
  ) {
    unitsStore.selectedAges = [Age.All];
  } else {
    unitsStore.selectedAges = selectedAges;
  }
};
</script>
