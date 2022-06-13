<template>
  <v-app-bar
    color="primary900"
    app
  >
    <v-container v-if="!mobile">
      <v-row justify="space-between">
        <v-col cols="auto" align-self="center">
          <v-container>
            <v-row>
              <v-col
                cols="auto"
                class="px-0"
                align-self="center"
              >
                <v-img
                  src="/images/logo/circle-logo.png"
                />
              </v-col>
              <v-col align-self="center">
                <c-text
                  color="primary400"
                  class="ma-0"
                  font-weight="bold"
                  font-size="24"
                  v-text="'TAGIHIN'"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col cols="auto" align-self="center">
          <v-container>
            <v-row justify="center">
              <v-col
                v-for="(menu, index) in appbarMenus"
                :key="index"
                class="pe-0"
              >
                <v-menu
                  v-if="menu.subMenus"
                  rounded="xl"
                  open-on-click
                  offset-y
                  right
                >
                  <template #activator="{ on, attrs }">
                    <div
                      :class="`d-flex pa-1 px-2 ${attrs['aria-expanded'] === 'false' ? 'menu-item-link' : 'menu-item-link-active'}`"
                      :style="{ cursor: 'pointer' }"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <c-text
                        color="white"
                        font-size="16"
                        font-weight="600"
                        class="ma-0 me-1"
                        v-text="menu.title"
                      />
                      <v-icon
                        color="white"
                        style="transition: all 0.4s"
                        v-text="attrs['aria-expanded'] === 'false' ? 'mdi-chevron-down' : 'mdi-chevron-up' "
                      />
                    </div>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(subMenu, subIndex) in menu.subMenus"
                      :key="subIndex"
                    >
                      <v-list-item-icon class="me-2">
                        <v-img
                          :src="subMenu.iconImage"
                        />
                      </v-list-item-icon>
                      <v-list-item-title>
                        <c-text
                          font-weight="600"
                          font-size="20"
                          class="ma-0"
                          v-text="subMenu.title"
                        />
                        <c-text
                          color="grey"
                          class="ma-0"
                          font-weight="500"
                          font-size="14"
                          v-text="subMenu.subTitle"
                        />
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
                <c-text
                  v-else
                  color="white"
                  font-size="16"
                  font-weight="600"
                  class="ma-0 menu-item-link pa-1 px-3"
                  v-text="menu.title"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col cols="auto" align-self="center">
          <v-container>
            <v-row>
              <v-col>
                <v-btn
                  color="white"
                  class="primary--text"
                  @click="() => $router.push('/login')"
                  v-text="'Masuk'"
                />
              </v-col>
              <v-col>
                <v-btn
                  color="primary"
                  class="white--text"
                  v-text="'Daftar'"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-row justify="space-between">
        <v-col cols="auto" align-self="center">
          <v-img
            src="/images/logo/circle-logo.png"
          />
        </v-col>
        <v-col cols="auto" align-self="center">
          <v-btn
            icon
            dark
            @click="openMobileMenuDialog"
          >
            <v-icon color="white">
              mdi-view-headline
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBarMainLayout',

  props: {
    mobileMenuDialog: {
      type: Boolean,
      default: false
    },
    appbarMenus: {
      type: null,
      default: []
    }
  },

  emits: [
    'open-mobile-menu-dialog'
  ],

  computed: {
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
    openMobileMenuDialog () {
      return this.$emit('open-mobile-menu-dialog')
    }
  }
}
</script>

<style scoped>
  .menu-item-link:hover {
    background-color: var(--v-primary800-base);
    border-radius: 20px;
    transition: 0.2s all;
  }

  .menu-item-link-active {
    background-color: var(--v-primary700-base);
    border: 2px solid var(--v-primary400-base);
    border-radius: 20px;
    margin: 0px;
    transition: 0.2s all;
  }
</style>
