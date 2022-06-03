<template>
  <default-layout>
    <!-- BEGIN SIDE BAR -->
    <v-navigation-drawer
      v-if="$vuetify.breakpoint.mobile"
      v-model="drawer"
      color="blue400"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list dense nav>
        <div
          v-for="(menu, index) in dataMenus"
          :key="index"
        >
          <v-list-item
            v-if="!menu.subMenus"
            :to="menu.to"
            color="blue"
            router
            exact
          >
            <v-list-item-action>
              <v-icon
                color="blue100"
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
            color="blue"
            no-action
          >
            <template #activator>
              <v-list-item class="ps-0">
                <v-list-item-action>
                  <v-icon
                    color="blue100"
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
              color="blue"
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
            color="blue"
            link
            @click="logoutDialog"
          >
            <v-list-item-action>
              <v-icon
                color="blue100"
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
      v-if="$vuetify.breakpoint.mobile"
      :clipped-left="clipped"
      fixed
      color="blue"
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
    <v-app-bar
      v-else
      app
      color="blue"
    >
      <v-container>
        <v-row>
          <v-col align-self="center">
            <nuxt-link to="/" class="white--text text-decoration-none">
              <h1
                class="font-weight-black font-italic logo-app-bar"
                v-text="appBar.logo"
              />
            </nuxt-link>
          </v-col>
          <v-spacer />
          <v-col v-if="!($vuetify.breakpoint.mobile)" align-self="center" cols="auto">
            <v-row>
              <v-col cols="auto">
                <v-menu transition="scroll-y-transition">
                  <template #activator="{ on, attrs }">
                    <v-btn
                      color="white"
                      class="ma-2"
                      text
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon class="pe-1">
                        mdi-account-outline
                      </v-icon>
                      Username
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item link>
                      <v-list-item-title>
                        <v-icon class="pe-1">
                          mdi-account
                        </v-icon>
                        Account
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item link>
                      <v-list-item-title>
                        <v-icon class="pe-1">
                          mdi-logout
                        </v-icon>
                        Logout
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-col>
            </v-row>
          </v-col>
          <v-col
            v-else
            cols="auto"
          >
            <v-btn
              icon
              @click.stop="drawer = !drawer"
            >
              <v-icon>
                mdi-view-headline
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <!-- END APP BAR -->

    <!-- BEGIN MAIN CONTENT -->
    <v-main v-if="$vuetify.breakpoint.mobile">
      <Nuxt />
    </v-main>
    <v-main v-else>
      <v-container>
        <v-row>
          <v-col class="mt-10" cols="3">
            <v-navigation-drawer floating>
              <v-list
                color="blue100"
                style="border-radius: 20px !important;"
                rounded
              >
                <div
                  v-for="(menu, index) in dataMenus"
                  :key="index"
                >
                  <v-list-item
                    v-if="!menu.subMenus"
                    active-class="active-list"
                    :to="menu.to"
                    color="blue"
                    router
                    exact
                  >
                    <v-list-item-action>
                      <v-icon
                        color="blue600"
                        size="20"
                      >
                        {{ menu.icon }}
                      </v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title class="blue--text" v-text="menu.title" />
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-group
                    v-else
                    color="blue"
                    no-action
                  >
                    <template #activator>
                      <v-list-item class="ps-0">
                        <v-list-item-action>
                          <v-icon
                            color="blue600"
                            size="20"
                          >
                            {{ menu.icon }}
                          </v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                          <v-list-item-title class="blue--text" v-text="menu.title" />
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                    <v-list-item
                      v-for="(subMenu, subIndex) in menu.subMenus"
                      :key="subIndex"
                      :to="subMenu.to"
                      color="blue"
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
                        <v-list-item-title class="blue--text" v-text="subMenu.title" />
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-group>
                </div>
                <div>
                  <v-list-item
                    color="blue"
                    link
                    @click="logoutDialog"
                  >
                    <v-list-item-action>
                      <v-icon
                        color="blue600"
                        size="20"
                      >
                        mdi-logout-variant
                      </v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title class="blue--text" v-text="'Log-out'" />
                    </v-list-item-content>
                  </v-list-item>
                </div>
              </v-list>
            </v-navigation-drawer>
          </v-col>
          <v-col>
            <Nuxt />
          </v-col>
        </v-row>
      </v-container>
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
  name: 'AdminDashboardLayout',

  components: {
    DefaultLayout
  },

  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: true,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'TAGIHIN',
      appBar: {
        logo: 'TAGIHIN'
      }
    }
  },

  computed: {
    dataMenus () {
      return dataMenus
    }
  },

  methods: {
    logoutDialog () {}
  }
}
</script>

<style scoped>
  .logo-app-bar {
    font-size: 24px;
    white-space: nowrap;
    word-break: keep-all;
  }

  .logo-app-bar,
  .link-app-bar {
    width: fit-content;
    cursor: pointer;
  }

  .footer-menus {
    color: white;
    text-decoration: none;
  }

  .active-list {
    background-color: var(--v-blue200-base);
  }
</style>
