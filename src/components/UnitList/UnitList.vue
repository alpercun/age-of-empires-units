<template>
  <div class="unit-list">
    <div class="unit-list-column-visibility-controls-wrapper">
      <v-select
        class="unit-list-column-visibility-controls"
        v-model="selectedColumns"
        :items="headers"
        item-title="title"
        item-value="id"
        item-class="custom-list-item"
        multiple
        label="Visible Columns"
        prepend-icon="mdi-eye"
        hide-details
      />
    </div>

    <v-data-table-virtual
      class="unit-list-table"
      :headers="visibleHeaders"
      :items="units"
      height="400"
      @click:row="handleRowClick"
    >
      <template #[`item.cost`]="{ item }">
        {{ formatCost(item.cost) }}
      </template>
    </v-data-table-virtual>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, computed, watch } from 'vue';
import { resourceIcons, type Resource } from './UnitList.constants';
import type { Unit } from '@/types/interfaces';

interface Header {
  id: string;
  title: string;
  key: string;
  value?: string;
}

const props = defineProps<{
  units: Unit[];
  headers: Header[];
}>();

const router = useRouter();

const formatCost = (cost: Unit['cost']): string => {
  if (!cost || Object.keys(cost).length === 0) return '-';

  return Object.entries(cost)
    .map(
      ([resource, amount]) =>
        `${resourceIcons[resource as Resource]} ${resource}: ${amount}`,
    )
    .join(', ');
};

const handleRowClick = (event: Event, { item }: { item: Unit }) => {
  router.push(`/units/${item.id}`);
};

const selectedColumns = ref(props.headers.map(header => header.id));

const visibleHeaders = computed(() => {
  return props.headers.filter(header =>
    selectedColumns.value.includes(header.id),
  );
});

watch(selectedColumns, (newValue, oldValue) => {
  if (newValue.length === 0 && oldValue.length > 0) {
    selectedColumns.value = [oldValue[0]];
  }
});
</script>

<style src="./UnitList.scss" lang="scss" scoped />
