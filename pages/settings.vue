<template>
  <v-container
    fluid
    :class="`main-content-bg fill-height align-start ${mobile ? 'pa-5' : 'pa-10'}`"
  >
    <v-row>
      <v-col>
        <v-container class="pa-0">
          <v-row>
            <!-- BEGIN HEADER TITLE -->
            <c-text
              v-if="!mobile"
              font-size="32"
              v-text="'Settings'"
            />
            <!-- END HEADER TITLE -->
          </v-row>
          <v-row>
            <FormSettingsPage />
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FormSettingsPage from '@/components/component-pages/settings/FormSettingsPage.vue'

export default {
  name: 'SettingsPage',

  components: {
    FormSettingsPage
  },

  layout: 'dashboard',

  middleware: ['auth'],

  computed: {
    mobile () {
      return this.$vuetify.breakpoint.mobile
    }
  }
}
</script>
