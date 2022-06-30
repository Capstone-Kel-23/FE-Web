<template>
  <v-container
    fluid
    :class="`main-content-bg fill-height align-start ${mobile ? 'pa-5' : 'pa-10'}`"
  >
    <v-row>
      <v-col>
        <v-container
          fluid
          class="pa-0"
        >
          <v-row>
            <!-- BEGIN HEADER TITLE -->
            <c-text
              v-if="!mobile"
              font-size="32"
              v-text="'Clients'"
            />
            <!-- <v-text-field
              v-if="mobile"
              v-model="searchKeyword"
              class="search-field-wrapper mb-5"
              placeholder="Search Invoice"
              hide-details=""
              color="primary"
              background-color="white"
              append-icon="mdi-magnify"
              outlined
              dense
            /> -->
            <!-- END HEADER TITLE -->
          </v-row>
          <v-row>
            <DataTableClientsPage />
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DataTableClientsPage from '@/components/component-pages/clients/DataTableClientsPage.vue'

export default {
  name: 'ClientsPage',

  components: {
    DataTableClientsPage
  },

  layout: 'dashboard',

  data () {
    return {
      searchKeyword: ''
    }
  },

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
