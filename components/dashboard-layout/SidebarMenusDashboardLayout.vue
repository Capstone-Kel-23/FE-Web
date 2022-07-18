<template>
  <v-layout
    class="fill-height column justify-space-between"
  >
    <v-list>
      <v-container class="mb-5">
        <v-row justify="center">
          <v-col
            cols="auto"
            align-self="center"
            class="pe-0 logo-side-bar"
            @click="() => $router.push('/')"
          >
            <v-img
              lazy-src="/images/logo/circle-logo.png"
              max-width="40"
              class="cursor-pointer"
              max-height="40"
              src="/images/logo/circle-logo.png"
            />
          </v-col>
          <v-col
            cols="auto"
            class="logo-side-bar cursor-pointer"
            @click="() => $router.push('/')"
          >
            <c-text
              font-size="32"
              color="primary400"
              class="ma-0"
              v-text="'TAGIHIN'"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-list-item
        v-for="(menu, index) in menus"
        :key="index"
        :to="menu.to"
        active-class="active-menu-side-bar"
        router
        exact
      >
        <v-list-item-action>
          <v-img
            max-width="25"
            max-height="25"
            :src="menu.icon"
            :lazy-src="menu.icon"
          />
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="menu.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list>
      <v-list-item
        to=""
        @click="logout"
      >
        <v-list-item-action>
          <v-img
            max-width="25"
            max-height="25"
            src="/images/icon/nav-drawer/logout.svg"
            lazy-src="/images/icon/nav-drawer/logout.svg"
          />
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="'Keluar'" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-layout>
</template>

<script>
export default {
  name: 'SidebarMenusDashboardLayout',

  props: {
    menus: {
      type: null,
      default: []
    }
  },

  emits: [
    'logout'
  ],

  methods: {
    logout () {
      return this.$emit('logout')
    }
  }
}
</script>

<style scoped>
  .logo-side-bar {
    cursor: pointer;
  }

  .active-menu-side-bar {
    background-color: var(--v-primary-base);
  }

  .active-menu-side-bar.v-list-item--link:before {
    background-color: transparent !important;
  }

  .cursor-pointer {
    cursor: pointer;
  }
</style>
