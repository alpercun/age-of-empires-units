<template>
  <v-data-table
    class="unit-list"
    :headers="headers"
    :items="units"
    @click:row="handleRowClick"
  >
    <template #[`item.cost`]="{ item }">
      {{ formatCost(item.cost) }}
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUnitsStore } from '@/stores/units';

type Resource = 'Food' | 'Wood' | 'Gold';

interface Unit {
  id: number;
  name: string;
  age: string;
  cost: Record<Resource, number> | undefined;
}

interface Header {
  id: string;
  title: string;
  key: string;
}

defineProps<{
  units: Unit[];
  headers: Header[];
}>();

const resourceIcons: Record<Resource, string> = {
  Food: '🍎',
  Wood: '🪵',
  Gold: '💰',
};

const router = useRouter();
const unitsStore = useUnitsStore();

const formatCost = (cost: Record<Resource, number> | undefined): string => {
  if (!cost || Object.keys(cost).length === 0) return '-';

  return Object.entries(cost)
    .map(
      ([resource, amount]) =>
        `${resourceIcons[resource as Resource]} ${resource}: ${amount}`,
    )
    .join(', ');
};

const handleRowClick = (event: Event, { item }: { item: Unit }) => {
  unitsStore.setSelectedUnit(item);
  router.push(`/units/${item.id}`);
};
</script>

<style src="./UnitList.scss" lang="scss" scoped />
