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
                  <strong>{{ formatLabel(key) }}</strong>
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
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import {
  resourceIcons,
  type Resource,
} from '@/components/UnitList/UnitList.constants';

const iconMap: { [key: string]: string } = {
  expansion: '🏰',
  age: '⏳',
  cost: '💰',
  wood: '🌳',
  gold: '🥇',
  build_time: '⏱️',
  reload_time: '🔄',
  attack_delay: '⏲️',
  movement_rate: '🏃',
  line_of_sight: '👁️',
  hit_points: '❤️',
  range: '🎯',
  attack: '⚔️',
  armor: '🛡️',
  accuracy: '✔️',
  blast_radius: '💥',
  armor_bonus: '🔰',
  attack_bonus: '⚔️➕',
};

const route = useRoute();
const unitsStore = useUnitsStore();
const { selectedUnit } = storeToRefs(unitsStore);

const unit = ref(unitsStore.selectedUnit);

const formatLabel = (key: string): string => {
  const formattedKey = key
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const icon = iconMap[key.toLowerCase()] || '';
  return `${icon} ${formattedKey}`;
};

const formatValue = (
  value: string | number | object | null | undefined,
): string => {
  if (value === null || value === undefined) {
    return '-';
  }

  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      return value.join(', ');
    } else {
      return Object.entries(value)
        .map(([key, val]) => `${resourceIcons[key as Resource]} ${key}: ${val}`)
        .join(', ');
    }
  }

  return value.toString();
};

onMounted(() => {
  if (!unit.value) {
    const unitId = route.params.id;
    const foundUnit = unitsStore.units.find(unit => unit.id === Number(unitId));
    if (foundUnit) {
      unit.value = foundUnit;
      unitsStore.setSelectedUnit(foundUnit);
    }
  }
});
</script>

<style src="./UnitDetailView.scss" lang="scss" scoped />
