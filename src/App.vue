<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Age of Empires Units</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" text>Home</v-btn>
      <v-btn to="/units" text>Units</v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
