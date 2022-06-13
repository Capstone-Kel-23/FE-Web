<template>
  <v-card
    width="100%"
    color="primary"
    class="pa-3"
  >
    <v-container>
      <v-row justify="space-between" class="px-3">
        <v-col
          cols="auto"
          align-self="center"
        >
          <v-img
            src="/images/logo/circle-logo.png"
          />
        </v-col>
        <v-col
          cols="auto"
          align-self="center"
        >
          <v-btn
            icon
            color="red"
            @click="closeMobileMenuDialog"
          >
            <v-icon color="white">
              mdi-window-close
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <!-- <div
            v-for="(menu, index) in appbarMenus"
            :key="index"
          >
          </div> -->
          <v-expansion-panels
            accordion
            dark
            flat
            tile
          >
            <v-expansion-panel
              v-for="(menu, index) in appbarMenus"
              :key="index"
            >
              <v-expansion-panel-header
                v-if="menu.subMenus"
                color="primary"
                class="pa-4"
              >
                {{ menu.title }}
              </v-expansion-panel-header>
              <v-expansion-panel-content
                v-if="menu.subMenus"
                color="primary"
              >
                <v-list-item
                  v-for="(subMenu, subIndex) in menu.subMenus"
                  :key="subIndex"
                  dense
                >
                  <v-list-item-icon class="me-5">
                    <v-img
                      max-width="40"
                      :src="subMenu.iconImage"
                    />
                  </v-list-item-icon>
                  <v-list-item-title
                    v-text="subMenu.title"
                  />
                </v-list-item>
              </v-expansion-panel-content>
              <v-expansion-panel-header
                v-if="!menu.subMenus"
                color="primary"
                class="pa-4"
                v-text="menu.title"
              />
              <!-- <v-list-item v-if="!menu.subMenus">
                <v-list-item-title
                  class="white--text"
                  v-text="menu.title"
                />
              </v-list-item> -->
            </v-expansion-panel>
          </v-expansion-panels>
          <div class="d-flex justify-space-between mt-5">
            <v-col class="ps-0">
              <v-btn
                width="100%"
                color="white"
                class="primary--text"
                @click="() => $router.push('/login')"
                v-text="'Masuk'"
              />
            </v-col>
            <v-col class="pe-0">
              <v-btn
                width="100%"
                color="primary600"
                class="white--text"
                v-text="'Daftar'"
              />
            </v-col>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'AppBarMobileMainLayout',

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
    'close-mobile-menu-dialog'
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
    closeMobileMenuDialog () {
      return this.$emit('close-mobile-menu-dialog')
    }
  }
}
</script>
