<template>
  <v-container>
    <h1>Units Page</h1>
    <UnitList :units="unitsStore.units" :headers="headers" />
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UnitList from '@/components/UnitList/UnitList.vue';
import { useUnitsStore } from '@/stores/units';

const unitsStore = useUnitsStore();

const headers = ref([
  { id: 'id', title: 'ID', key: 'id' },
  { id: 'name', title: 'Name', key: 'name' },
  { id: 'age', title: 'Age', key: 'age' },
  { id: 'cost', title: 'Cost', key: 'cost' },
]);
</script>
