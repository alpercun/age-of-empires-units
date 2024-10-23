<template>
  <div class="app-header">
    <img
      src="@/assets/images/logo.png"
      alt="Age of Empires Logo"
      class="app-header-logo"
    />
    <div class="app-header-buttons">
      <v-btn to="/" variant="text">Home</v-btn>
      <v-btn to="/units" variant="text">Units</v-btn>
      <v-switch
        :model-value="isDarkTheme"
        hide-details
        inset
        density="compact"
        @update:model-value="$emit('update:isDarkTheme', $event ?? false)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isDarkTheme: boolean;
}>();

defineEmits<{
  (e: 'update:isDarkTheme', value: boolean): void;
}>();
</script>

<style scoped lang="scss" src="./AppHeader.scss" />
