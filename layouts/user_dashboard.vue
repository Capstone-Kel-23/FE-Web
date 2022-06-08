<template>
  <default-layout>
    <!-- BEGIN SIDE BAR -->
    <v-navigation-drawer
      v-model="drawer"
      color="primary400"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list dense nav>
        <div
          v-for="(menu, index) in menus"
          :key="index"
        >
          <v-list-item
            v-if="!menu.subMenus"
            :to="menu.to"
            color="primary"
            router
            exact
          >
            <v-list-item-action>
              <v-icon
                color="primary100"
                size="20"
              >
                {{ menu.icon }}
              </v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="white--text" v-text="menu.title" />
            </v-list-item-content>
          </v-list-item>
          <v-list-group
            v-else
            color="primary"
            no-action
          >
            <template #activator>
              <v-list-item class="ps-0">
                <v-list-item-action>
                  <v-icon
                    color="primary100"
                    size="20"
                  >
                    {{ menu.icon }}
                  </v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="white--text" v-text="menu.title" />
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item
              v-for="(subMenu, subIndex) in menu.subMenus"
              :key="subIndex"
              :to="subMenu.to"
              color="primary"
              router
              exact
            >
              <v-list-item-action>
                <v-icon
                  color="white"
                  size="20"
                >
                  {{ subMenu.icon }}
                </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="white--text" v-text="subMenu.title" />
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </div>
        <div>
          <v-list-item
            color="primary"
            link
            @click="logoutDialog"
          >
            <v-list-item-action>
              <v-icon
                color="primary100"
                size="20"
              >
                mdi-logout-variant
              </v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="white--text" v-text="'Log-out'" />
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>
    <!-- END SIDE BAR -->

    <!-- BEGIN APP BAR -->
    <v-app-bar
      :clipped-left="clipped"
      fixed
      color="primary"
      dark
      app
    >
      <v-btn
        icon
        @click.stop="drawer = !drawer"
      >
        <v-icon color="white">
          mdi-view-headline
        </v-icon>
      </v-btn>
      <v-toolbar-title
        class="font-weight-bold"
        style="cursor: pointer !important"
        @click="() => $router.push('/')"
        v-text="title"
      />
    </v-app-bar>
    <!-- END APP BAR -->

    <!-- BEGIN MAIN CONTENT -->
    <v-main>
      <Nuxt />
    </v-main>
    <!-- END MAIN CONTENT -->

    <!-- BEGIN FOOTER -->
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <!-- END FOOTER -->
  </default-layout>
</template>

<script>
import DefaultLayout from './default.vue'
import dataMenus from '@/values/menus'

export default {
  name: 'UserDashboardLayout',

  components: {
    DefaultLayout
  },

  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: true,
      menus: dataMenus,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'TAGIHIN'
    }
  },

  methods: {
    logoutDialog () {}
  }
}
</script>
