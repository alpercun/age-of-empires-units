<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-title>Age of Empires Units</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" text>Home</v-btn>
      <v-btn to="/units" text>Units</v-btn>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<style lang="scss"></style>
