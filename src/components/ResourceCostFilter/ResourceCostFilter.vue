<template>
  <div class="resource-cost-filter">
    <div class="resource-cost-filter-checkbox">
      <v-checkbox
        v-model="selected"
        :label="type"
        @change="handleChange"
        hide-details
      />
    </div>
    <div class="resource-cost-filter-slider-wrapper">
      <div class="resource-cost-filter-slider">
        <v-range-slider
          v-model="range"
          :min="min"
          :max="max"
          :step="1"
          hide-details
          :disabled="!selected"
          @update:modelValue="handleChange"
        />
      </div>
      <span
        :class="[
          'resource-cost-filter-slider-value',
          {
            'resource-cost-filter-slider-value-active': selected,
          },
        ]"
      >
        {{ range[0] }} - {{ range[1] }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  type: string;
  min: number;
  max: number;
}>();

const emit = defineEmits<{
  (
    e: 'update',
    value: {
      selected: boolean;
      type: string;
      range: { min: number; max: number };
    },
  ): void;
}>();

const selected = ref(false);
const range = ref([props.min, props.max]);

const handleChange = () => {
  emit('update', {
    selected: selected.value,
    type: props.type,
    range: {
      min: range.value[0],
      max: range.value[1],
    },
  });
};
</script>

<style src="./ResourceCostFilter.scss" lang="scss" scoped />
