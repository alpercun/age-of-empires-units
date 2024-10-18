<template>
  <v-container>
    <h1 class="home-view-title">{{ unitsStore.title }}</h1>
    <v-img
      src="/src/assets/images/aoe-image.jpg"
      alt="Age of Empires"
      width="100%"
      height="400"
    />
  </v-container>
</template>

<script setup lang="ts">
import { useUnitsStore } from '@/stores/units';

const unitsStore = useUnitsStore();
</script>

<style scoped src="./HomeView.scss" />
