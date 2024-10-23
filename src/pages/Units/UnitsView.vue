<template>
  <v-container>
    <h1>Units</h1>
    <UnitAgeFilter v-model="unitsStore.selectedAges" :items="unitsStore.ages" />
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

const unitsStore = useUnitsStore();

const headers = ref([
  { id: 'id', title: 'ID', key: 'id' },
  { id: 'name', title: 'Name', key: 'name' },
  { id: 'age', title: 'Age', key: 'age' },
  { id: 'cost', title: 'Cost', key: 'cost' },
]);
</script>
