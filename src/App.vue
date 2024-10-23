<template>
  <v-app>
    <AppHeader
      :isDarkTheme="isDarkTheme"
      @update:isDarkTheme="updateIsDarkTheme"
    />

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import AppHeader from '@/components/AppHeader/AppHeader.vue';

const isDarkTheme = ref(localStorage.getItem('darkTheme') === 'true');

const updateIsDarkTheme = (value: boolean) => {
  isDarkTheme.value = value;
};

const updateTheme = () => {
  document.body.classList.toggle('dark-theme', isDarkTheme.value);
  localStorage.setItem('darkTheme', isDarkTheme.value.toString());
};

onMounted(() => {
  updateTheme();
});

watch(isDarkTheme, updateTheme, { immediate: true });
</script>
