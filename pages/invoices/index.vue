<template>
  <v-container
    fluid
    :class="`main-content-bg fill-height align-start ${mobile ? 'pa-5' : 'pa-10'}`"
  >
    <v-row>
      <v-col>
        <!-- BEGIN HEADER TITLE -->
        <v-container class="pa-0">
          <v-row
            v-if="!mobile"
            justify="space-between"
          >
            <v-col
              cols="auto"
              align-self="center"
            >
              <c-text
                font-size="32"
                class="ma-0"
                v-text="'Invoices'"
              />
            </v-col>
            <v-col
              cols="auto"
              align-self="center"
            >
              <v-btn
                color="primary"
                dark
                to="/invoices/create"
              >
                <v-icon
                  class="pe-1"
                  v-text="'mdi-plus'"
                />
                Add New
              </v-btn>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col>
              <c-text
                font-size="20"
                font-weight="bold"
                class="text-center"
                v-text="'Invoices'"
              />
            </v-col>
          </v-row>
        </v-container>
        <!-- END HEADER TITLE -->

        <!-- BEGIN DATATABLE -->
        <DataTableInvoicesPage
          v-if="!mobile"
        />
        <DataTableMobileInvoicesPage
          v-else
        />
        <!-- END DATATABLE -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DataTableInvoicesPage from '@/components/component-pages/invoices/DataTableInvoicesPage.vue'
import DataTableMobileInvoicesPage from '@/components/component-pages/invoices/DataTableMobileInvoicesPage.vue'

export default {
  name: 'InvoicesPage',

  components: {
    DataTableInvoicesPage,
    DataTableMobileInvoicesPage
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
