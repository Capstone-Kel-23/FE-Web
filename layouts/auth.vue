<template>
  <default-layout>
    <v-app-bar
      v-if="mobile && routePath != '/welcome' && routePath != '/' && routePath != ''"
      app
      elevation="0"
    >
      <v-btn
        icon
        color="black"
        link
        @click="() => $router.go(-1)"
      >
        <v-icon size="40">
          mdi-chevron-left
        </v-icon>
      </v-btn>
      <v-spacer />
      <c-text
        font-size="24"
        font-weight="bold"
        class="text-center ma-0"
        v-text="headerAppBar"
      />
      <v-spacer />
    </v-app-bar>
    <v-main
      :style="{ backgroundColor: mobile ? 'var(--v-neutral400-base)' : '' }"
    >
      <Nuxt />
    </v-main>
    <v-footer
      v-if="mobile && routePath === '/forgot'"
    >
      <v-btn
        width="100%"
        color="primary"
        v-text="'Reset Password'"
      />
    </v-footer>
  </default-layout>
</template>

<script>
import DefaultLayout from './default.vue'

export default {
  name: 'AuthLayout',

  components: {
    DefaultLayout
  },

  computed: {
    mobile () {
      return this.$vuetify.breakpoint.mobile
    },

    routePath () {
      return this.$route.path
    },

    headerAppBar () {
      let header = ''
      if (this.routePath === '/login') {
        header = 'Masuk'
      } else if (this.routePath === '/forgot') {
        header = 'Lupa Password'
      }
      return header
    }
  }
}
</script>

<style>
  .main-container-wrapper {
    background-color: var(--v-primary100-base);
    padding: 100px;
    border-radius: 10px;
  }

  .bg-container {
    background-color: var(--v-primary100-base);
    transition: linear 0.2s;
  }
</style>
