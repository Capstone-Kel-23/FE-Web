<template>
  <default-layout>
    <v-main>
      <Nuxt />
    </v-main>
  </default-layout>
</template>

<script>
import DefaultLayout from './default.vue'

export default {
  name: 'AuthLayout',

  components: {
    DefaultLayout
  }
}
</script>

<style>
  .main-container-wrapper {
    background-color: var(--v-blue100-base);
    padding: 100px;
    border-radius: 10px;
  }

  .bg-container {
    background-color: var(--v-blue100-base);
    transition: linear 0.2s;
  }
</style>
