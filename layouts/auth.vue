<template>
  <default-layout>
    <v-app-bar
      v-if="mobile && routePath != '/welcome' && routePath != '/' && routePath != ''"
      app
      elevation="0"
    >
      <div>
        <v-btn
          icon
          color="black"
          link
          @click="backDirection"
        >
          <v-icon size="40">
            mdi-chevron-left
          </v-icon>
        </v-btn>
      </div>
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
      <v-container
        fluid
        class="fill-height"
      >
        <v-row justify="center">
          <v-container v-if="!mobile">
            <v-row justify="center">
              <v-col
                cols="auto"
                align-self="center"
              >
                <v-img
                  src="/images/logo/logo.png"
                  max-width="60"
                  class="mx-auto cursor-pointer"
                  @click="() => $router.push('/')"
                />
              </v-col>
              <v-col
                cols="auto"
                align-self="center"
              >
                <div @click="() => $router.push('/')">
                  <c-text
                    font-size="40"
                    font-weight="bold"
                    color="primary400"
                    class="ma-0 cursor-pointer"
                    v-text="'TAGIHIN'"
                  />
                </div>
              </v-col>
            </v-row>
          </v-container>
          <Nuxt class="pt-0" />
        </v-row>
      </v-container>
    </v-main>
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
      } else if (this.routePath === '/register') {
        header = 'Daftar'
      }
      return header
    }
  },

  methods: {
    backDirection () {
      return this.routePath === '/login' || this.routePath === '/register'
        ? this.$router.push('/')
        : this.$router.go(-1)
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

  .cursor-pointer {
    cursor: pointer;
  }
</style>
