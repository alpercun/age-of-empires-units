<template>
  <v-container class="unit-detail-view">
    <div v-if="selectedUnit">
      <h1 class="unit-detail-view-title">{{ selectedUnit.name }}</h1>
      <p class="unit-detail-view-description">{{ selectedUnit.description }}</p>
      <v-card class="unit-detail-view-card">
        <v-card-text>
          <v-row>
            <template v-for="(value, key) in selectedUnit" :key="key">
              <v-col
                cols="12"
                sm="6"
                v-if="key !== 'name' && key !== 'description' && key !== 'id'"
              >
                <p class="unit-detail-view-item">
                  <strong>{{ formatLabel(key) }}:</strong>
                  <span>{{ formatValue(value) }}</span>
                </p>
              </v-col>
            </template>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
    <div v-else class="unit-detail-view-not-found">Cannot find unit</div>
  </v-container>
</template>

<script setup lang="ts">
import { useUnitsStore } from '@/stores/units';
import { storeToRefs } from 'pinia';

const unitsStore = useUnitsStore();
const { selectedUnit } = storeToRefs(unitsStore);

const formatLabel = (key: string): string => {
  return key
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const formatValue = (value: string | number | object): string => {
  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      return value.join(', ');
    } else {
      return Object.entries(value)
        .map(([key, val]) => `${key}: ${val}`)
        .join(', ');
    }
  }

  return value.toString();
};
</script>

<style src="./UnitDetailView.scss" lang="scss" scoped />
