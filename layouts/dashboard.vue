<template>
  <default-layout>
    <v-navigation-drawer
      v-if="!mobile"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      color="primary900"
      fixed
      dark
      app
    >
      <SidebarMenusDashboardLayout
        :menus="menus"
        @logout="logout"
      />
    </v-navigation-drawer>
    <v-navigation-drawer
      v-else
      v-model="webDrawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      color="primary900"
      fixed
      dark
      app
    >
      <SidebarMenusDashboardLayout
        :menus="menus"
        @logout="logout"
      />
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      :color="mobile ? 'primary400' : 'white'"
      :elevation="mobile ? '0' : ''"
      class="app-bar-wrapper"
      :dense="mobile"
      fixed
      app
    >
      <v-container fluid>
        <v-row justify="space-between">
          <v-col cols="auto" align-self="center" class="ps-0">
            <div
              v-if="mobile"
              class="mobile-app-bar-logo d-flex px-3"
              @click.stop="drawer = !drawer"
            >
              <v-img
                max-width="25"
                max-height="25"
                src="/images/logo/circle-logo.png"
              />
              <c-text
                font-weight="600"
                color="primary200"
                class="ma-0 ms-1"
                v-text="'TAGIHIN'"
              />
            </div>
          </v-col>
          <v-col cols="auto">
            <v-container>
              <v-row
                :justify="mobile ? 'space-between' : 'end'"
              >
                <v-col
                  cols="auto"
                  class="pe-0"
                  align-self="center"
                >
                  <v-btn
                    icon
                    :color="mobile ? 'grey' : 'neutral600'"
                  >
                    <v-icon size="30">
                      mdi-bell-outline
                    </v-icon>
                  </v-btn>
                </v-col>
                <v-col
                  v-if="!mobile"
                  cols="auto"
                  align-self="center"
                  :class="`${mobile ? 'px-0' : ''}`"
                >
                  <v-container
                    class="user-btn-wrapper"
                    :style="mobile ? 'border-radius: 999px' : ''"
                  >
                    <v-row>
                      <v-col
                        cols="auto"
                        class="py-2 pe-0"
                      >
                        <v-img
                          :max-width="mobile ? '30' : '45'"
                          :max-height="mobile ? '30' : '45'"
                          class="me-3"
                          lazy-src="/images/profile/user-profile.png"
                          src="/images/profile/user-profile.png"
                        />
                      </v-col>
                      <v-col
                        v-if="!mobile"
                        cols="auto"
                        class="py-2 ps-0"
                      >
                        <div>
                          <c-text
                            class="ma-0"
                            font-weight="bold"
                            v-text="user.fullname"
                          />
                          <c-text
                            class="ma-0"
                            color="neutral700"
                            v-text="user.position"
                          />
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
    <v-bottom-navigation
      v-if="mobile"
      color="primary400"
      app
    >
      <v-btn
        v-for="(menu, index) in bottomMenus"
        :key="index"
      >
        <c-text
          font-size="10"
          class="ma-0"
          v-text="menu.title"
        />
        <v-img
          max-width="25"
          max-height="25"
          :src="menu.icon"
          :lazy-src="menu.icon"
        />
      </v-btn>
    </v-bottom-navigation>
  </default-layout>
</template>

<script>
import DefaultLayout from './default.vue'
import dataMenus from '@/values/menus'
import dataBottomMenus from '@/values/bottomMenus'
import SidebarMenusDashboardLayout from '~/components/dashboard-layout/SidebarMenusDashboardLayout.vue'

export default {
  name: 'DashboardLayout',

  components: {
    DefaultLayout,
    SidebarMenusDashboardLayout
  },

  data () {
    return {
      clipped: false,
      drawer: true,
      webDrawer: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },

  computed: {
    user () {
      return {
        fullname: 'Fabian Valerian',
        position: 'Sales Manager'
      }
    },

    menus () {
      return dataMenus
    },

    bottomMenus () {
      return dataBottomMenus
    },

    mobile () {
      return this.$vuetify.breakpoint.mobile
    },

    breakPoint () {
      return {
        sm: this.$vuetify.breakpoint.sm,
        md: this.$vuetify.breakpoint.md,
        lg: this.$vuetify.breakpoint.lg
      }
    }
  },

  methods: {
    logout () {}
  }
}
</script>

<style>
  .main-content-bg {
    background-color: var(--v-neutral400-base);
  }
</style>

<style scoped>
  .user-btn-wrapper {
    transition: 0.2s all;
    border-radius: 10px;
  }

  .user-btn-wrapper:hover {
    background-color: var(--v-grey-base);
    cursor: pointer;
  }

  .mobile-app-bar-logo {
    background-color: var(--v-primary900-base);
    border-radius: 0px 10px 10px 0px;
    padding: 11px;
    padding-top: 12px;
  }

  .app-bar-wrapper >>> .v-toolbar__content {
    padding-left: 0px !important;
    padding-right: 0px !important;
    padding-top: 0px !important;
  }
</style>
