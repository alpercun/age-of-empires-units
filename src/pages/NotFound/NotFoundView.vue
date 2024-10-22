<template>
  <div class="not-found">
    <img
      class="not-found-image"
      src="@/assets/images/not-found.png"
      alt="404"
    />
    <h1 class="not-found-title">Page Not Found</h1>
    <p class="not-found-description">
      Sorry, the page you are looking for does not exist.
    </p>
    <router-link class="not-found-link" to="/">Go to Homepage</router-link>
  </div>
</template>

<style src="./NotFoundView.scss" setup lang="scss" />
