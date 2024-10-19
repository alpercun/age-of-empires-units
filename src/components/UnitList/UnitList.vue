<template>
  <v-data-table :headers="headers" :items="unitsStore.units">
    <template #[`item.cost`]="{ item }">
      {{ formatCost(item.cost) }}
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUnitsStore } from '@/stores/units';

type Resource = 'Food' | 'Wood' | 'Gold';

const unitsStore = useUnitsStore();

const resourceIcons: Record<Resource, string> = {
  Food: '🍎',
  Wood: '🪵',
  Gold: '💰',
};

const headers = ref([
  { id: 'id', title: 'ID', key: 'id' },
  { id: 'name', title: 'Name', key: 'name' },
  { id: 'age', title: 'Age', key: 'age' },
  { id: 'cost', title: 'Cost', key: 'cost' },
]);

const formatCost = (cost: Record<Resource, number> | undefined): string => {
  if (!cost || Object.keys(cost).length === 0) return '-';

  return Object.entries(cost)
    .map(
      ([resource, amount]) =>
        `${resourceIcons[resource as Resource]} ${resource}: ${amount}`,
    )
    .join(', ');
};
</script>
