<template>
  <v-container
    v-if="mobile"
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
              v-text="'Reports'"
            />
            <v-col v-else>
              <c-text
                font-size="20"
                font-weight="bold"
                class="text-center ma-0"
                v-text="'Reports'"
              />
            </v-col>
            <!-- END HEADER TITLE -->
          </v-row>
          <v-row>
            <!-- <DataTableClientsPage
              v-if="!mobile"
            /> -->
            <TableMobileReportsPage />
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TableMobileReportsPage from '@/components/component-pages/reports/TableMobileReportsPage.vue'

export default {
  name: 'ReportsMobilePage',

  components: {
    TableMobileReportsPage
  },

  layout: 'dashboard',

  middleware: ['auth'],

  computed: {
    mobile () {
      return this.$vuetify.breakpoint.mobile
    }
  },

  beforeCreate () {
    if (!this.$vuetify.breakpoint.mobile) {
      this.$router.go(-1)
    }
  },

  updated () {
    if (!this.$vuetify.breakpoint.mobile) {
      this.$router.go(-1)
    }
  }
}
</script>
