<template>
  <div>
    <v-chip-group
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      column
      multiple
    >
      <v-chip v-for="item in items" :key="item" :value="item" filter outlined>
        {{ item }}
      </v-chip>
    </v-chip-group>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
  items: {
    type: Array as PropType<string[]>,
    required: true,
  },
});

defineEmits(['update:modelValue']);
</script>
