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
              v-text="'Clients'"
            />
            <v-col v-else>
              <c-text
                font-size="20"
                font-weight="bold"
                class="text-center ma-0"
                v-text="'Clients'"
              />
            </v-col>
            <!-- END HEADER TITLE -->
          </v-row>
          <v-row>
            <DataTableClientsPage
              v-if="!mobile"
            />
            <DataTableMobileClientsPage
              v-else
            />
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DataTableClientsPage from '@/components/component-pages/clients/DataTableClientsPage.vue'
import DataTableMobileClientsPage from '@/components/component-pages/clients/DataTableMobileClientsPage.vue'

export default {
  name: 'ClientsPage',

  components: {
    DataTableClientsPage,
    DataTableMobileClientsPage
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

<style scoped>
  .search-field-wrapper {
    font-size: 14px;
  }

  .search-field-wrapper >>> .v-text-field__slot input,
  .search-field-wrapper >>> .v-input__icon--append i {
    color: var(--v-primary-base)
  }

  .search-field-wrapper >>> .v-text-field__slot input::placeholder {
    color: var(--v-primary400-base)
  }
</style>
